import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(
                userId,{
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now()+3600000
                }
            )
        }
        else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(
                userId,{
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now()+3600000
    })
}

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "4915f5f0ed6383",
            pass: "af25df413a3000"
            }
        });
      
      const mailOptions = {
        from:'gaderishi77@gmail.com',
        to:email,
        subject:emailType==='VERIFY'? 'verify your account':'reset password',
        html: emailType==='VERIFY'?`<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
        <br/> or copy past this in your browser<br/>
       <p> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p> `: `<p>click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a>
       <br/> or copy past this in your browser<br/>
      <p> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p> `
      }
      const mailresponse = transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        });
      return mailresponse
}
    catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}