import { prisma } from "@/lib/prisma";

export function getLaborRate(jobType: string, level: string) {
  return prisma.laborRate.findUnique({
    where: {
      jobType_level: {
        jobType,
        level,
      },
    },
  });
}
