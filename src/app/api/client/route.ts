import { NextResponse } from "next/server";

import db from "@/utils/db";

export async function GET(request: Request) {
  console.log("connecting to db");
  const logs = await db.collection("logs").find().toArray();
  console.log("connected to db");

  return NextResponse.json(logs);
}
