import { NextResponse } from "next/server";
import { getEquipmentById } from "../services"

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const customer = await getEquipmentById(id);

  if (!customer) {
    return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
  }

  return NextResponse.json(customer);
}