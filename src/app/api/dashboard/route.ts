import { NextRequest, NextResponse } from "next/server";
import { getDashboardStats } from "@/server/controllers/general";

export async function GET(req: NextRequest) {
  const dashboardStats = await getDashboardStats();

  return NextResponse.json(dashboardStats);
}
