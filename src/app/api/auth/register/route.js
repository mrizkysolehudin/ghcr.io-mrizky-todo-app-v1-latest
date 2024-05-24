import { NextResponse } from "next/server";
import { registerUser } from "./service";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await registerUser(body)
    return NextResponse.json(result.responseData, result.responseStatus);
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}
