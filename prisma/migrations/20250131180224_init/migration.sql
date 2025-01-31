/*
  Warnings:

  - The primary key for the `psychologist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "psychologist" DROP CONSTRAINT "psychologist_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "psychologist_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "psychologist_id_seq";
