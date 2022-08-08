const data = require("../mockData.json");
import axios from 'axios';
import { Request, Response } from 'express';
import { SupplierProduct } from '../types/product';

interface Product {
    name: string;
    quantity: number;
}

export default {
    addToCart: async function addToCart(req: Request<void, void, { cartId: string; products: Product[] }>, res: Response) {
        const { cartId, products } = req.body;
        const cart: { lines: { quantity: number; retailerProductId: number }[] } = { lines: [] };
        products.forEach(product => {
            const { quantity, name } = product;
            const mockData = data as SupplierProduct[];
            const productIndex = mockData.findIndex(item => item.names[1].short.includes(name));
            const productId = mockData[productIndex].id;
            cart.lines.push({ quantity: quantity, retailerProductId: productId });
        })
        const url = `https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/carts/${cartId}`;
        try {
            const response = await axios.patch(url, cart, {});
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
        }
    },
    createEmptyCart: async function createEmptyCart(_req: Request, res: Response) {
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