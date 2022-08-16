-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_unitOfMesaureId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "unitOfMesaureId" DROP NOT NULL,
ALTER COLUMN "unitOfMesaureId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitOfMesaureId_fkey" FOREIGN KEY ("unitOfMesaureId") REFERENCES "UnitOfMesaure"("id") ON DELETE SET NULL ON UPDATE CASCADE;
