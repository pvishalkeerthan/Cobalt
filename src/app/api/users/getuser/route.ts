

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Login from "@/models/loginModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        if(userId == null){
            return NextResponse.json({
                message:'user not found',
                success: false,
            })
            
        }
        const user = await User.findOne({_id:userId})

            const response = NextResponse.json({
                message:'user found',
                user: user,
            })
            
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
