/*
  Warnings:

  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slideId]` on the table `Slide` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slideId` to the `Slide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slide" ADD COLUMN     "slideId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "Translation";

-- CreateIndex
CREATE UNIQUE INDEX "Slide_slideId_key" ON "Slide"("slideId");
