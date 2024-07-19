

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import Login from "@/models/loginModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const tok = getDataFromToken(request);
        if (tok == null) {
            return NextResponse.json({message:' ',success:true})
        }
        if(!await checkSessionExistenceServerSide(request)){
            const res = NextResponse.json({message:'you are logged out ',success:false})
                  res.cookies.set('token','')
                      return res
          }else{
           return NextResponse.json({message:' ',success:true})
          }

        }catch(error){
            return NextResponse.json({error: error.message })
        }
    
    

    }