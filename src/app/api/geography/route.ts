import { NextRequest, NextResponse } from "next/server";
import { getGeography } from "@/server/controllers/client";

export async function GET(req: NextRequest) {
  const users = await getGeography();

  return NextResponse.json(users);
}
