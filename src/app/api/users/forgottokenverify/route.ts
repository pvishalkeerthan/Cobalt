import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest) {

    try {
        const reqBody = await request.json()
        const {token} = reqBody;

       const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})
       if(!user){
        return NextResponse.json({error:'invalid token'},{status:400})
       }
       return NextResponse.json({message:'email verified',success:true})

    } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
        
    }
}