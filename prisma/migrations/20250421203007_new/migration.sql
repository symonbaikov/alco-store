/*
  Warnings:

  - You are about to drop the column `slideId` on the `Slide` table. All the data in the column will be lost.
  - Made the column `title` on table `Slide` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Slide` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Slide_slideId_key";

-- AlterTable
ALTER TABLE "Slide" DROP COLUMN "slideId",
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "namespace" TEXT NOT NULL DEFAULT 'common',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_key_language_namespace_key" ON "Translation"("key", "language", "namespace");
