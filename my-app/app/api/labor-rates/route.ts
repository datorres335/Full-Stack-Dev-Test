import { NextResponse } from "next/server";
import { getLaborRates } from "./services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const jobType = searchParams.get("jobType") ?? undefined;
  const level = searchParams.get("level") ?? undefined;

  const laborRates = await getLaborRates(jobType, level);
  return NextResponse.json(laborRates);
}
