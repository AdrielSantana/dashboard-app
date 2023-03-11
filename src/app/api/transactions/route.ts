import { getTransactions } from "@/server/controllers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pageParam: string | null = req.nextUrl.searchParams.get("page");
  let page: number | null = null;
  if (pageParam) {
    page = parseFloat(pageParam);
  }

  const pageSizeParam: string | null = req.nextUrl.searchParams.get("pageSize");
  let pageSize: number | null = null;
  if (pageSizeParam) {
    pageSize = parseFloat(pageSizeParam);
  }

  const sortParam: string | null = req.nextUrl.searchParams.get("sort");
  let sort: string | null = null;
  if (sortParam) {
    sort = sortParam;
  }

  const customers = await getTransactions(page, pageSize, sort);
  return NextResponse.json(customers);
}
