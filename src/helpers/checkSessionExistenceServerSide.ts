import Login from "@/models/loginModel"
import { getDataFromToken } from "./getDataFromToken"
import { getTokensToken } from "./getTokensToken"
import { NextRequest } from "next/server"

export default async function checkSessionExistenceServerSide(request: NextRequest){
    const userId = await getDataFromToken(request)
        const token = await getTokensToken(request)
        
        const session = await Login.findOne({token:token, userId:userId})
        if(session == null){
            return false
        }
        else
        return true
}