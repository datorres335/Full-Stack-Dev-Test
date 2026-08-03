import { prisma } from "@/lib/prisma";

export function getEquipment() {
  return prisma.equipment.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
}

export function getEquipmentById(id: string) {
  return prisma.equipment.findUnique({
    where: { id },
  });
}