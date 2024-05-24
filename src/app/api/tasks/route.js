import { NextResponse } from "next/server";
import { createTask, deleteTask, getTasksByUserId, updateTask } from "./service";

export async function GET(request) {
  const qParams = request.nextUrl.searchParams;
  const userId = qParams.get("userId");

  try {
    if (userId) {
      const result = await getTasksByUserId(userId)
      return NextResponse.json(result.responseData, result.responseStatus);
    }
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}


export async function PUT(request) {
  try {
    const body = await request.json();
    const { data, dataId } = body

    switch (dataId) {
      case "updateTask":
        const result = await updateTask(data)
        return NextResponse.json(result.responseData, result.responseStatus);
      default:
        return NextResponse.json(null, { status: 400, statusText: "Bad request" });
    }
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { data, dataId } = body

    switch (dataId) {
      case "createTask":
        const result = await createTask(data)
        return NextResponse.json(result.responseData, result.responseStatus);
      default:
        return NextResponse.json(null, { status: 400, statusText: "Bad request" });
    }
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}


export async function DELETE(request) {
  try {
    const qParams = request.nextUrl.searchParams;
    const id = qParams.get("id");
    
    const result = await deleteTask(id)
    return NextResponse.json(result.responseData, result.responseStatus);
  } catch (error) {  
    return NextResponse.json(error, { status: 500, statusText: "Internal Server Error" });
  }
}