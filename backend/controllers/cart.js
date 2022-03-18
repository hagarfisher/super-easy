const data = require("../mockData.json");
const axios = require('axios');

module.exports.addToCart = async function addToCart(req, res) {
    const { cartId, products } = req.body;
    const cart = { lines: [] };
    // console.log(products);
    products.forEach(product => {
        const { quantity, name } = product;
        const productIndex = data.findIndex(item => item.names[1].short.includes(name));
        const productId = data[productIndex].id;
        cart.lines.push({ quantity: quantity, retailerProductId: productId });
    })
    const url = `https://www.primadonaonline.co.il/v2/retailers/1286/branches/1711/carts/${cartId}`;
    try {
        const response = await axios.patch(url, cart, {});
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
    }
}