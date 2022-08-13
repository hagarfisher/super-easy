import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import bluebird from 'bluebird';
import { SupplierProduct } from '../types/product';

const prisma = new PrismaClient();


const importPrimadonaData = async () => {
    const url = "https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/products";
    let index = 0;
    let total = 1;
    do {
        const queryParams = {
            filters: { "must": { "exists": ["family.id", "family.categoriesPaths.id", "branch.regularPrice"], "term": { "branch.isActive": true, "branch.isVisible": true } }, "mustNot": { "term": { "branch.regularPrice": 0 } } },
            from: index,
            isSearch: true,
            size: 100,
        }
        const { data } = await axios.get<{ total: number; products: SupplierProduct[] }>(url, {
            params: queryParams
        });
        index += 100;
        const { products } = data;
        ({ total } = data);
        await bluebird.each(products, (async (product: SupplierProduct) => {
            await prisma.product.create({
                data: {
                    productId: product.id,
                    name: product.localName,
                    brand: product.brand?.names[1] ?? 'unknown',
                    price: product.branch.regularPrice,
                    salePrice: product.branch.salePrice,
                    isWeighable: product.isWeighable,
                },
            });
            console.log(product.localName);
        }));
    } while (total > index + 100);
}

importPrimadonaData()
    .then(async () => {
        console.log("done");
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })