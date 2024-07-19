// this logouts other users by taking the token and user id

import { connect } from "@/dbConfig/dbConfig";
import checkSessionExistenceServerSide from "@/helpers/checkSessionExistenceServerSide";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getTokensToken } from "@/helpers/getTokensToken";
import { sendEmailLoginInfo } from "@/helpers/infoMailer";
import Login from "@/models/loginModel";

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId });
  const reqBody = await request.json();
  const { token } = reqBody;
  const deletedLogin = await Login.deleteOne({ token: token, userId: userId });
  sendEmailLoginInfo({
    email: user.email,
    emailtype: "LOGOUTINFO",
    login: deletedLogin,
  });
  try {
    const response = NextResponse.json({
      message: "other user is logouted",
      success: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
