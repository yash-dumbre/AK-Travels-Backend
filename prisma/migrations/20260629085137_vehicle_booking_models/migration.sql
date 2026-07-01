/*
  Warnings:

  - You are about to alter the column `pricePerKm` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `updatedAt` to the `CompanySetting` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CompanySetting" ADD COLUMN     "aboutUs" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "termsAndConditions" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 5,
ALTER COLUMN "pricePerKm" SET DATA TYPE DECIMAL(10,2);
