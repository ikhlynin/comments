/*
  Warnings:

  - You are about to drop the column `captcha` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "captcha";
