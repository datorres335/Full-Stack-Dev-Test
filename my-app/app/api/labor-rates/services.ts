import { prisma } from "@/lib/prisma";

export function getLaborRate(jobType?: string) {
  return prisma.laborRate.findMany({
    where: {
      jobType: jobType
        ? {
            contains: jobType,
          }
        : undefined,
    },
    orderBy: {
      jobType: "asc",
    },
  });
}
