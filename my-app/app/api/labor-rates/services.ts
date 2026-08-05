import { prisma } from "@/lib/prisma";

export function getLaborRates(jobType?: string, level?: string) {
  return prisma.laborRate.findMany({
    where: {
      jobType,
      level,
    },
    orderBy: [{ jobType: "asc" }, { level: "asc" }],
  });
}
