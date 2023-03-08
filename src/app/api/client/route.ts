import { NextResponse } from "next/server";

import connectDb from "@/server/utils/connectDb";

export async function GET(request: Request) {
  await connectDb();

  return NextResponse.json({ success: true });
}
