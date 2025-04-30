/*
  Warnings:

  - You are about to drop the column `email` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "email",
DROP COLUMN "imageUrl",
ADD COLUMN     "text_key" TEXT;
