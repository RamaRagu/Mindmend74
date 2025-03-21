/*
  Warnings:

  - The primary key for the `Ebook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Ebook` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Ebook` table. All the data in the column will be lost.
  - Changed the type of `ebookId` on the `ChildEbookProgress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `author` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categories` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `illustrator` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readingTimeMin` to the `Ebook` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Ebook` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ChildEbookProgress" DROP CONSTRAINT "ChildEbookProgress_ebookId_fkey";

-- AlterTable
ALTER TABLE "ChildEbookProgress" DROP COLUMN "ebookId",
ADD COLUMN     "ebookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ebook" DROP CONSTRAINT "Ebook_pkey",
DROP COLUMN "_id",
DROP COLUMN "coverImage",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "categories" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "illustrator" TEXT NOT NULL,
ADD COLUMN     "readingTimeMin" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "difficulty" DROP DEFAULT,
ALTER COLUMN "isActive" DROP DEFAULT,
ADD CONSTRAINT "Ebook_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChildEbookProgress_childId_ebookId_key" ON "ChildEbookProgress"("childId", "ebookId");

-- AddForeignKey
ALTER TABLE "ChildEbookProgress" ADD CONSTRAINT "ChildEbookProgress_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
