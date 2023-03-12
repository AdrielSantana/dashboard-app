import { NextRequest, NextResponse } from "next/server";
import { getSales } from "@/server/controllers/client";

export async function GET(req: NextRequest) {
  const sales = await getSales();

  return NextResponse.json(sales);
}
