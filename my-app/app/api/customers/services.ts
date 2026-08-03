import { prisma } from "@/lib/prisma";

export function getCustomers(name?: string) {
  return prisma.customer.findMany({
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

export function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
  });
}