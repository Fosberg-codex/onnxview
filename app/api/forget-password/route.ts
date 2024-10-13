import User from "../../models/User";
import {connectMongoDB} from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { EmailTemplate } from '../../components/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: any) => {
  const { email } = await request.json();

  await connectMongoDB();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email does not exist", { status: 400 });
  }

  //this will be stored in the url
  const resetToken = crypto.randomBytes(20).toString("hex");

  //this will be stored in the database
  const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")


  //creating the password reset value
  const passwordResetExpires= Date.now() + 3600000
  
  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;


  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${resetToken}`;

  console.log(resetUrl);

  const body  = "Please reset password by clicking on " + resetUrl


  // twilio recover code = KK5HQLTKTE57NF2LU92JWC4U
  // twilio password 0 Augfos&the7y8288289hvs

  try {
    const { data, error } = await resend.emails.send({
      from: 'Plutoflow@unicornboost.co',
      to: [email],
      subject: 'Reset',
      react: EmailTemplate({ text: body }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error }, { status: 500 });
    }

    await existingUser.save();
    return Response.json({data, msg:"password reset link sent to email"});
  } catch (error) {
    existingUser.resetPasswordToken = undefined;
    existingUser.resetTokenExpiry = undefined;
    await existingUser.save();

    return Response.json({ error }, { status: 500 });
  }


  
};
