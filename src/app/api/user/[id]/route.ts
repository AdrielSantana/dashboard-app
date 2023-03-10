import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/server/controllers/general";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const user = await getUser(req, params);

  return NextResponse.json(user);
}
