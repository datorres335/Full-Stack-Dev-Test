import { NextResponse } from "next/server";
import { getLaborRate } from "./services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const jobType = searchParams.get("jobType") ?? undefined;

  if (jobType) {
    const laborRates = await getLaborRate(jobType)

    return NextResponse.json(laborRates);
  } else {
    return NextResponse.json(
      { error: "jobType is required" },
      { status: 400 },
    );
  }

}