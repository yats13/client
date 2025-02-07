/*
  Warnings:

  - You are about to drop the `AboutSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AboutSection";

-- CreateTable
CREATE TABLE "aboutSection" (
    "id" TEXT NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "aboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aboutSection_sectionKey_key" ON "aboutSection"("sectionKey");
