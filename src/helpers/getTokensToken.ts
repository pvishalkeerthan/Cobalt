import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";

export const getTokensToken = (request :NextRequest)=>{
    try {
        const token = request.cookies.get('token')?.value || ''
        if(token == ""){
            return null
        }
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedToken.token
    } catch (error:any) {
        throw new Error(error.message)
    }
}