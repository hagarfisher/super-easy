/*
  Warnings:

  - You are about to drop the column `Products` on the `List` table. All the data in the column will be lost.
  - Added the required column `products` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "Products",
ADD COLUMN     "products" JSONB NOT NULL;
