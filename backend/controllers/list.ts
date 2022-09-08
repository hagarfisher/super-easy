import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../app";
import { Product, SupplierProduct } from "../types/product";

export default {
    // @ts-ignore
    createList: async function createList(req, res) {
        const email = req.auth.email;
        const { products, name } = req.body;
        
        try{
            const list = await prisma.list.create({
            data: {
                email,
                name,
                products,
            }
        }); 
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json(error);
    }
    }
}
