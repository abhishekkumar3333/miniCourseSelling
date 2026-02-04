/*
  Warnings:

  - You are about to drop the column `topic` on the `Lession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lession" DROP COLUMN "topic",
ADD COLUMN     "topicVideo" TEXT;
