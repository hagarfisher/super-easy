import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../app";
import { Product, SupplierProduct } from "../types/product";

export default {
    // @ts-ignore
    createList: async function createList(req, res) {
        // get email from auth0
        console.log(req.auth.email);
        const email = req.auth.email;
        const { products, name } = req.body;

        const list = await prisma.list.create({
            data: {
                email: email,
                name: "test",
                products,
            }
        });
    }
}
