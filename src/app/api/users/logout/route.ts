import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getTokensToken } from "@/helpers/getTokensToken";
import Login from "@/models/loginModel";


connect()

export async function GET(request:NextRequest) {

        const userId = await getDataFromToken(request)
        const token = await getTokensToken(request)

        await Login.deleteOne({token:token, userId:userId})

        try {
            const response = NextResponse.json({
                message:'logout',
                success:true,
            })

            response.cookies.set('token','',{httpOnly:true,expires: new Date(0)})
            
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
