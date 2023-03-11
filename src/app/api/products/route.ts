import { getProducts } from "@/server/controllers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParam: string | null = req.nextUrl.searchParams.get("search");
  let search: string | null = null;
  if (searchParam) {
    search = searchParam;
  }

  const products = await getProducts(search);
  return NextResponse.json(products);
}
