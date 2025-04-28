/*
  Warnings:

  - Added the required column `text_key` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "text_key" TEXT NOT NULL;
