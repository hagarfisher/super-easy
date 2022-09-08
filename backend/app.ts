import bodyParser from "body-parser";
import cors from "cors";
import express from 'express';
import { expressjwt as jwt } from 'express-jwt';
import jwks, { GetVerificationKey } from 'jwks-rsa';
import cart from "./controllers/cart";
import list from "./controllers/list";
import { SupplierProduct } from './types/product';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const app = express();
export const prisma = new PrismaClient();

const corsOptions = {
    origin: "http://localhost:3000"
};

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-5zxzugi9.us.auth0.com/.well-known/jwks.json'
  }) as GetVerificationKey,
  audience: 'http://localhost:8080',
  issuer: 'https://dev-5zxzugi9.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(cors(corsOptions));
app.use(jwtCheck);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/createEmptyCart", cart.createEmptyCart);
app.post("/list/create", list.createList);
app.post("/cart/add", cart.addToCart);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function getProductDetails(item: SupplierProduct) {
    const product = {
        id: item.productId,
        name: item.localName,
        price: item.branch.regularPrice
    };
    return product
}