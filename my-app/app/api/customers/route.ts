import { NextResponse } from "next/server";
import { getCustomers } from "./services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") ?? undefined;
  const customers = await getCustomers(name);

  return NextResponse.json(customers);
}