import { prisma } from "@/lib/prisma";

export function getEquipment(name?: string) {
  return prisma.equipment.findMany({
    where: {
      name: name
        ? {
            contains: name,
          }
        : undefined,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export function getEquipmentById(id: string) {
  return prisma.equipment.findUnique({
    where: { id },
  });
}