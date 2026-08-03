import { prisma } from "@/lib/prisma";

export function getCustomers() {
  return prisma.customer.findMany({
    orderBy: { name: "asc" },
  });
}

export function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
  });
}