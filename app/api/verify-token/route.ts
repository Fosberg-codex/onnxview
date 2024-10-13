import User from "../../models/User";
import {connectMongoDB} from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { EmailTemplate } from '../../components/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: any) => {
  try {
    const { token } = await request.json();

    await connectMongoDB();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: new Date() },
    });
  
    if (!user) {
      console.log("Invalid token or has expired");
      return new NextResponse("Invalid token or has expired", { status: 400 });
    }
  
    console.log(user + " is here Bro");
    return new NextResponse(JSON.stringify(user), {status: 200});
    
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}