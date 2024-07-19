import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import Snippet from '@/models/snippetModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {code,description,title,tags,src} = reqBody
        const userId = getDataFromToken(request)
        if(userId == null){
            console.log(true)
            const response = NextResponse.json({
                message:'snippets  not found',
                success:false
            });
            return response
        }
        await Snippet.create({
            userId:userId,code:code,description:description,title:title,tags:tags,src:src
        })

        return NextResponse.json({message:'snippet created',success:true})

        } catch (error:any) {

        return NextResponse.json({error: error.message},{status:500})

    }
}