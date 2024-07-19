import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import Login from '@/models/loginModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userAgent } from 'next/server';
import requestIp from 'request-ip';
import geoipLite from 'geoip-lite';
import { sendEmailLoginInfo } from '@/helpers/infoMailer';


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {browser,os} = userAgent(request);
        const {email,password} = reqBody;
        const user = await User.findOne({email:email})
        if (!user){
            return NextResponse.json({message:'user does not exist',success:false})
        }
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:'wrong password',success:false})
        }

        const tokentoken = makeToken();
        
        const tokenData = {
            id : user._id,
            username:user.username,
            email: user.email,
            token: tokentoken
        }

        const newLogin = new Login({
            userId:user._id,
            token:tokentoken,
            city: request.geo?.city,
            country: request.geo?.country ,
            region: request.geo?.region ,
            latitude: request.geo?.latitude ,
            longitude: request.geo?.longitude ,
            ip: request.ip,
            browser_name:browser.name,
            browser_version:browser.version,
            os_name:os.name,
            os_version:os.version
        })

        

        // send mail------------------------------------------------------------------
        sendEmailLoginInfo({email:user.email,emailtype:"LOGININFO",login:newLogin})

        await newLogin.save()

        let token
            while (!token) {
            token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
            }
        const response = NextResponse.json({
            message:'login successful',
            success:true
        })
        if(token){
            token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        }
        response.cookies.set('token',token,{httpOnly:true})
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }

}

const TOKEN_TOKEN_LENGTH = 6

function makeToken() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < TOKEN_TOKEN_LENGTH) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}



