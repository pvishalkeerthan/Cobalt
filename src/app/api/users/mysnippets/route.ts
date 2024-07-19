

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Login from "@/models/loginModel";
import Snippet from "@/models/snippetModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        if(userId == null){
            console.log(true)
            const response = NextResponse.json({
                message:'snippets  not found',
                success:false
            });
            return response
        }else{
            const snippets = await Snippet.find({userId:userId})
            const response = NextResponse.json({
                message:'snippets found',
                snippets: snippets,
            })
            
            return response
        }
        
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
