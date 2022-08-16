import bluebird from "bluebird";
import { PrismaClient } from "@prisma/client";
import { SupplierProduct } from "../types/product";

const prisma = new PrismaClient();

export async function generateProductData() {
    const products = await prisma.rawData.findMany({
        select: {
            value: true,
        },
    });
    await bluebird.each(products, async (product) => {
        const { value } = product;
        const parsedProduct: SupplierProduct = JSON.parse(value as string ?? '{}');
        const createdUnitOfMeasure = await prisma.unitOfMesaure.create({
            data: {
                name: parsedProduct.unitOfMeasure?.names[2] ?? 'unknown',
            },
        });
        await prisma.product.create({
            data: {
                productId: parsedProduct.id,
                name: parsedProduct.localName,
                brand: parsedProduct.brand?.names[1] ?? 'unknown',
                price: parsedProduct.branch.regularPrice,
                salePrice: parsedProduct.branch.salePrice,
                isWeighable: parsedProduct.isWeighable,
                unitOfMesaureId: createdUnitOfMeasure.id,
            },
        });
    }).catch((error) => {
        console.error(error);
    });
}


generateProductData()
    .then(async () => {
        console.log("done");
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })