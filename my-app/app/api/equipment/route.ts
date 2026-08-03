import { NextResponse } from "next/server";
import { getEquipment } from "./services";

export async function GET() {
  const customers = await getEquipment();
  return NextResponse.json(customers);
}