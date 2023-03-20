import { LoginParamProps } from "@/client/services/useAuth";
import { userLogin } from "@/server/controllers/general";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: LoginParamProps = await req.json();
  const user = await userLogin(body);

  let res = new NextResponse();
  if (user?.status) {
    res.cookies.set("token", user.token!, {
      maxAge: 60 * 24 * 2,
      httpOnly: true,
      secure: true,
    });
  }

  return NextResponse.json(user, { headers: res.headers });
}
