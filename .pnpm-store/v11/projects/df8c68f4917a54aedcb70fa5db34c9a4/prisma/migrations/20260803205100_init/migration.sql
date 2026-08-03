-- CreateTable
CREATE TABLE "customers" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "modelNumber" TEXT NOT NULL,
    "baseCost" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "labor_rates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobType" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "hourlyRate" INTEGER NOT NULL,
    "estimatedHoursMin" REAL NOT NULL,
    "estimatedHoursMax" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "labor_rates_jobType_level_key" ON "labor_rates"("jobType", "level");
