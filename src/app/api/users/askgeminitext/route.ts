import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { generateResponse } from "@/helpers/generateResponse";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { prompt } = reqBody;
    const text = await generateResponse(prompt,[])  
    return NextResponse.json({ message: text, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
