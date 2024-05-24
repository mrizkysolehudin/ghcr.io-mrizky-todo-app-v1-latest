import { NextResponse } from "next/server";
import { loginGuest, loginUserRegistered } from "./service";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { data, dataId } = body

    let result;
    switch (dataId) {
      case "guest":
        result = await loginGuest(res) 
        return NextResponse.json(result.responseData, result.responseStatus);
      default:
        result = await loginUserRegistered(data)
        return NextResponse.json(result.responseData, result.responseStatus);
    }
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}
