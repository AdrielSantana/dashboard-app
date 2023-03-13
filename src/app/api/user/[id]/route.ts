import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/server/controllers/general";

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
  const user = await getUser(req, params);

  return NextResponse.json(user);
}
