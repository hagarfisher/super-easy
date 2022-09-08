declare namespace Express {
    export interface Request {
       auth: {
        email: string;
       }
    }
 }