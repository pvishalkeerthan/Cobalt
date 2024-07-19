import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { generateResponsewithImage } from "@/helpers/generateResponsewithImage";

connect();

export async function GET(request: NextRequest) {
  try {
    const text = await generateResponsewithImage()
    return NextResponse.json({ message: text, success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
