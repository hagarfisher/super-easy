import bodyParser from "body-parser";
import cors from "cors";
import express from 'express';
import cart from "./controllers/cart";
import list from "./controllers/list";
import { SupplierProduct } from './types/product';

const router = express.Router();
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/createEmptyCart", cart.createEmptyCart);
app.post("/list", list.createList);
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
// TODO
// post /login
// post /logout
// post /signup
// post /list - send shopping list
// get /lists