-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Products" JSONB NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);
