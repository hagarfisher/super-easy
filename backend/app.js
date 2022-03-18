const express = require('express');
const bodyParser = require("body-parser");
const db = require("./db/models");
const controller = require("./db/controllers/user.controller");
const cors = require("cors");
const axios = require('axios');
const cart = require("./controllers/cart");

const router = express.Router();

const app = express();

const createTestUser = async () => {
    const user = await controller.createUser({
        name: "user#1",
        email: "user@example.com",
        password: "123",
    });
};

// db.sequelize.sync().then(() => {createTestUser()});
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     createTestUser();
// });

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to supereasy application." });
// });
app.get("/createEmptyCart",(req, res) => {createEmptyCart(req, res)});
app.post("/list", (req, res) => { createList(req, res) });
app.post("/cart/add",(req, res) => { cart.addToCart(req, res) });

const PORT = 8080;//process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

async function createEmptyCart(req, res) {
    const url = "https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/carts";
    const body = {"lines":[]}
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
async function createList(req, res) {
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
    let responseProducts;
    try {
        const response = await axios.get(url, {
            params: queryParams
        });
        responseProducts = response.data.products;
    } catch (error) {
        console.error(error);
    }

    res.status(200).json(responseProducts.map(getProductDetails));
}

function getProductDetails(item) {
    const product = {
        id: item.productId,
        name: item.localName,
        price: item.branch.regularPrice
    };
    return product
}
// post /login
// post /logout
// post /signup
// post /list - send shopping list
// get /lists