/*
  Warnings:

  - The primary key for the `appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "appointment_email_key";

-- AlterTable
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_pkey",
DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "psychologistSlug" SET DATA TYPE TEXT,
ADD CONSTRAINT "appointment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "appointment_id_seq";
