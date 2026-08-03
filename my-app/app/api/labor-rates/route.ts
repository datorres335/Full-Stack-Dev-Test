import { NextResponse } from "next/server";
import { getLaborRate } from "./services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const jobType = searchParams.get("jobType") ?? undefined;
  const level = searchParams.get("level") ?? undefined;

  if (jobType && level) {
    const laborRates = await getLaborRate(jobType, level)

    return NextResponse.json(laborRates);
  } else {
    return NextResponse.json(
      { error: "jobType and level are required" },
      { status: 400 },
    );
  }

}