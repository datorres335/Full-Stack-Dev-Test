import { PrismaClient } from "@prisma/client";
import customers from "../data/customers";
import equipment from "../data/equipment";
import laborRates from "../data/labor_rates";

const prisma = new PrismaClient();

function serviceDate(date?: string) {
  return date ? new Date(`${date}T00:00:00.000Z`) : null;
}

async function ensureDatabase() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "customers" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "address" TEXT NOT NULL,
      "propertyType" TEXT NOT NULL,
      "squareFootage" INTEGER NOT NULL,
      "systemType" TEXT NOT NULL,
      "systemAge" INTEGER,
      "phone" TEXT,
      "lastServiceDate" DATETIME,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "equipment" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "brand" TEXT NOT NULL,
      "modelNumber" TEXT NOT NULL,
      "baseCost" INTEGER NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "labor_rates" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "jobType" TEXT NOT NULL,
      "level" TEXT NOT NULL,
      "hourlyRate" INTEGER NOT NULL,
      "estimatedHoursMin" REAL NOT NULL,
      "estimatedHoursMax" REAL NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "labor_rates_jobType_level_key"
    ON "labor_rates"("jobType", "level");
  `);
}

async function main() {
  await ensureDatabase();

  await Promise.all(
    customers.map((customer) =>
      prisma.customer.upsert({
        where: { id: customer.id },
        update: {
          name: customer.name,
          address: customer.address,
          propertyType: customer.propertyType,
          squareFootage: customer.squareFootage,
          systemType: customer.systemType,
          systemAge: customer.systemAge ?? null,
          phone: customer.phone ?? null,
          lastServiceDate: serviceDate(customer.lastServiceDate),
        },
        create: {
          id: customer.id,
          name: customer.name,
          address: customer.address,
          propertyType: customer.propertyType,
          squareFootage: customer.squareFootage,
          systemType: customer.systemType,
          systemAge: customer.systemAge ?? null,
          phone: customer.phone ?? null,
          lastServiceDate: serviceDate(customer.lastServiceDate),
        },
      }),
    ),
  );

  await Promise.all(
    equipment.map((item) =>
      prisma.equipment.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          category: item.category,
          brand: item.brand,
          modelNumber: item.modelNumber,
          baseCost: item.baseCost,
        },
        create: {
          id: item.id,
          name: item.name,
          category: item.category,
          brand: item.brand,
          modelNumber: item.modelNumber,
          baseCost: item.baseCost,
        },
      }),
    ),
  );

  await Promise.all(
    laborRates.map((rate) =>
      prisma.laborRate.upsert({
        where: {
          jobType_level: {
            jobType: rate.jobType,
            level: rate.level,
          },
        },
        update: {
          hourlyRate: rate.hourlyRate,
          estimatedHoursMin: rate.estimatedHours.min,
          estimatedHoursMax: rate.estimatedHours.max,
        },
        create: {
          jobType: rate.jobType,
          level: rate.level,
          hourlyRate: rate.hourlyRate,
          estimatedHoursMin: rate.estimatedHours.min,
          estimatedHoursMax: rate.estimatedHours.max,
        },
      }),
    ),
  );

  const [customerCount, equipmentCount, laborRateCount] = await Promise.all([
    prisma.customer.count(),
    prisma.equipment.count(),
    prisma.laborRate.count(),
  ]);

  console.log(`Seeded ${customerCount} customers`);
  console.log(`Seeded ${equipmentCount} equipment records`);
  console.log(`Seeded ${laborRateCount} labor rates`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
