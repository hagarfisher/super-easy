const data = require("../mockData.json");
import axios from 'axios';
import { Response } from 'express';
import { Product } from '../types/product';
import bluebird from 'bluebird';
import { prisma } from '../app';
import { RequestWithAuth } from '../types/request';

export default {
    addToCart: async function addToCart(req: RequestWithAuth<void, void, { cartId: string; products: Product[] }>, res: Response) {
        const { cartId, products } = req.body;
        const cart: { lines: { quantity: number; retailerProductId: number }[] } = { lines: [] };

        await bluebird.each(products, (async (product: Product) => {
            const lowestPriceProduct = await getLowestPricedProduct(product);
            let quantity = product.quantity;
            if (lowestPriceProduct && lowestPriceProduct.productId != 0) {
                if (!lowestPriceProduct.isWeighable) {
                    quantity = Math.floor(product.quantity);
                }
                cart.lines.push({ quantity, retailerProductId: lowestPriceProduct.productId });
            }
        }));
        const url = `https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/carts/${cartId}`;
        try {
            const response = await axios.patch(url, cart, {});
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
        }
    },
    searchProduct: async function searchProduct(req: RequestWithAuth, res: Response) {
        const product = req.query;
        if (product) {
            const lowestPriceProduct = await getLowestPricedProduct(product);
            let quantity = product.quantity;
            res.status(200).json(lowestPriceProduct);
        }
    },
    createEmptyCart: async function createEmptyCart(req: RequestWithAuth, res: Response) {
        const url = "https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/carts";
        const body = { "lines": [] }
        try {
            const response = await axios.post(url, {
                body
            });
            const cartId = response.data.cart.id;
            res.status(200).json({ cartId });
        } catch (error) {
            console.error(error);
        }
    }
}

async function getLowestPricedProduct(product: any) {

    const products = await prisma.product.findFirst({
        where: {
            name: {
                contains: product.name
            },
            NOT: {
                productId: 0
            }
        },
        orderBy: [{
            pricePerUnit: "asc"
        }]
    });
    console.log(products);
    return products;
}

