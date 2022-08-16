-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitOfMesaureId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UnitOfMesaure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitOfMesaure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawData" (
    "id" SERIAL NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "RawData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitOfMesaureId_fkey" FOREIGN KEY ("unitOfMesaureId") REFERENCES "UnitOfMesaure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
