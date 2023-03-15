import { LoginParamProps } from "@/client/services/useAuth";
import { userLogin } from "@/server/controllers/general";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: LoginParamProps = await req.json();
  const user = await userLogin(body);
  return NextResponse.json(user);
}
