import bluebird from "bluebird";
import { PrismaClient } from "@prisma/client";
import { SupplierProduct } from "../types/product";
import { isBuffer } from "util";

const prisma = new PrismaClient();

enum WeightConversion {
    kg = 1000,
    oz = 28.349523125,
    liter = 1000,
}

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
        const weight = parsedProduct.weight ?? 1;
        const numberOfItems = parsedProduct.numberOfItems ?? 1;
        const weightUnit = createdUnitOfMeasure.name;
        const totalWeight = weight * numberOfItems;
        let convertedWeight;
        let pricePerUnit;
        let lowestPrice;
        if (parsedProduct.branch.salePrice) {
            lowestPrice = parsedProduct.branch.salePrice;
        }
        else {
            lowestPrice = parsedProduct.branch.regularPrice;
        }

        if (weightUnit === 'Kilogram' || weightUnit === 'Liter') {
            convertedWeight = totalWeight * WeightConversion.kg;
        }
        else if (weightUnit === 'Oz' || weightUnit === 'fl oz') {
            convertedWeight = totalWeight * WeightConversion.oz;
        }

        if (convertedWeight) {
            pricePerUnit = lowestPrice / convertedWeight;
        }
        else if (weightUnit === 'unknown') {
            pricePerUnit = lowestPrice;
        }
        else {
            pricePerUnit = lowestPrice / totalWeight;
        }


        await prisma.product.create({
            data: {
                productId: parsedProduct.id,
                name: parsedProduct.localName,
                brand: parsedProduct.brand?.names[1] ?? 'unknown',
                price: parsedProduct.branch.regularPrice,
                salePrice: parsedProduct.branch.salePrice,
                isWeighable: parsedProduct.isWeighable,
                unitOfMesaureId: createdUnitOfMeasure.id,
                pricePerUnit,
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