-- CreateTable
CREATE TABLE "psychologist" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "visit_type" TEXT NOT NULL,
    "locale" TEXT NOT NULL,

    CONSTRAINT "psychologist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "psychologistSlug" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "psychologist_slug_key" ON "psychologist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "psychologist_email_key" ON "psychologist"("email");

-- CreateIndex
CREATE INDEX "psychologist_slug_idx" ON "psychologist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_email_key" ON "appointment"("email");
