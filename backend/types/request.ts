import { Request } from "express";

export interface RequestWithAuth<TBody = any, TQuery = any, TParams = any> extends Request<TBody, TQuery, TParams> {
    auth: {
        email: string;
    };
}