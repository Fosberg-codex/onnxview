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
    const { password, email } = await request.json();

    await connectMongoDB();
    const existingUser = await User.findOne({email}) 

    const hashedPassword = await bcrypt.hash(password, 5);
    existingUser.password = hashedPassword

    existingUser.resetToken = undefined
    existingUser.resetTokenExpiry = undefined

  
    await existingUser.save()
    console.log(existingUser + " is here Bro");
    return new NextResponse("User password is updated", {status: 200});
    
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}