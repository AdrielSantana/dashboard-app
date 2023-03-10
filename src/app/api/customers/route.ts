import { getCustomers } from "@/server/controllers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const customers = await getCustomers();
  return NextResponse.json(customers);
}
