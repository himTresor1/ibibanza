/*
  Warnings:

  - Added the required column `cell` to the `Plot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `Plot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plot" ADD COLUMN     "cell" TEXT NOT NULL,
ADD COLUMN     "village" TEXT NOT NULL;
