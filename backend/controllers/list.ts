import axios from "axios";
import { Request, Response } from "express";
import { SupplierProduct } from "../types/product";

export default {
    createList: async function createList(req: Request, res: Response) {
        //body: [{name:bread,quantity:3,brand:""},....]
        const products = req.body;
        const searchTerm = products[0].name;
        const url = "https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/products";
        const queryParams = {
            filters: { "must": { "exists": ["family.id", "family.categoriesPaths.id", "branch.regularPrice"], "term": { "branch.isActive": true, "branch.isVisible": true } }, "mustNot": { "term": { "branch.regularPrice": 0 } } },
            from: 0,
            isSearch: true,
            query: searchTerm
        }
        try {
            const response = await axios.get<{ products: SupplierProduct[] }>(url, {
                params: queryParams
            });
            const responseProducts = response.data.products;
            res.status(200).json(responseProducts.map(getProductDetails));
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}

function getProductDetails(getProductDetails: any): any {
    throw new Error("Function not implemented.");
}
