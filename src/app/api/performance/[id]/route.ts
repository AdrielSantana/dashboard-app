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

  const searchParam: string | null = req.nextUrl.searchParams.get("search");
  let search: string | null = null;
  if (searchParam) {
    search = searchParam;
  }

  const userPerformance = await getUserPerformance(
    params,
    page,
    pageSize,
    sort,
    search
  );

  return NextResponse.json(userPerformance);
}
