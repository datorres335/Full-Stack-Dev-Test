import { NextResponse } from "next/server";
import { getEquipment } from "./services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") ?? undefined;
  const equipment = await getEquipment(name);
  
  return NextResponse.json(equipment);
}