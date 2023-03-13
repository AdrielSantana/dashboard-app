import { NextRequest, NextResponse } from "next/server";
import { getUserPerformance } from "@/server/controllers/management";

type ParamsType = {
  id: string;
};

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: ParamsType;
  }
) {
  const userPerformance = await getUserPerformance(req, params);

  return NextResponse.json(userPerformance);
}
