/*
  Warnings:

  - Added the required column `displayName` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- First add the column as nullable
ALTER TABLE "Category" ADD COLUMN "displayName" TEXT;

-- Update existing records
UPDATE "Category" SET "displayName" = name;

-- Make the column required
ALTER TABLE "Category" ALTER COLUMN "displayName" SET NOT NULL;
