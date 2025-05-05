/*
  Warnings:

  - Added the required column `price` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
