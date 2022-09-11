import { Response } from "express";
import { prisma } from "../app";
import { RequestWithAuth } from "../types/request";

export default {
    createList: async function createList(req: RequestWithAuth, res: Response) {
        const email = req.auth.email;
        const { products, name } = req.body;

        try {
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
    },
    fetchLists: async function fetchLists(req: RequestWithAuth, res: Response) {
        const email = req.auth.email;
        try {
            const lists = await prisma.list.findMany({
                where: {
                    email
                }
            });
            res.status(200).json(lists);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
