import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token");

  if (token != undefined) {
    try {
      const { id, role }: any = jwt.verify(token.value, secret);
      return NextResponse.json({ user: { id, role }, status: true });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ status: false });
      }
    }
  }

  return NextResponse.json({ status: false });
}

export async function DELETE(req: NextRequest) {
  const hasToken = req.cookies.has("token");

  if (!hasToken) {
    return NextResponse.json({ status: false });
  }

  let res = new NextResponse();

  res.cookies.delete("token");

  return NextResponse.json({ status: true }, { headers: res.headers });
}
