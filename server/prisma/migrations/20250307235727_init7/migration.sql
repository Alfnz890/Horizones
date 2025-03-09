/*
  Warnings:

  - You are about to drop the column `image1` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `url_image1` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `url_image2` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `url_image3` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "url_image1",
DROP COLUMN "url_image2",
DROP COLUMN "url_image3",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "image_url" TEXT;
