import { NextResponse } from "next/server";
import { getUserById } from "./service";

export async function GET(request) {
	const qParams = request.nextUrl.searchParams;
  const id = qParams.get("id");

  try {
    if (id) {
      const result = await getUserById(id)
      return NextResponse.json(result.responseData, result.responseStatus);
    }
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}