import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendEmailLoginInfo = async ({ email, emailType, login }: any) => {
  try {
    if (emailType === "LOGININFO") {
    } else if (emailType === "LOGOUTINFO") {
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4915f5f0ed6383",
        pass: "af25df413a3000",
      },
    });

    const mailOptions = {
      from: "gaderishi77@gmail.com",
      to: email,
      subject:
        emailType === "LOGININFO"
          ? "Alert A new Login"
          : "You Are Logged Out From other device",
      html:
        emailType === "LOGININFO"
          ? `<p>${login.token} with ${login.browser_name} and ${login.os_name} is logged in with your id </p> `
          :`<p>${login.token} from ${login.browser_name} and ${login.os_name} logged out user session </p> `,
    };
    const mailresponse = transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
    return mailresponse;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
