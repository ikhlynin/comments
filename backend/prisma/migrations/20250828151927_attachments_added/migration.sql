/*
  Warnings:

  - You are about to drop the column `filename` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mimetype` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Attachment" DROP COLUMN "filename",
DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Comment" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "homePage" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."User";
