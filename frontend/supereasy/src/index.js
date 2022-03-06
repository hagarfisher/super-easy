import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import axios from 'axios';

import './index.css';

function ShoppingListInput() {
    const [products, setProducts] = useState([]);
  
    async function addProduct(product) {
        const url = "http://localhost:8080/list";
        try {
            const response = await axios.post(url, product);
            console.log(response);
            setProducts(response.data);
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div>
            <input type="text" id="productName" placeholder="Enter product name" />
            <input type="number" id="productQuantity" placeholder="Enter product quantity" />
            <button onClick={(e) => addProduct(e)} id="addProduct">Add product</button>
        </div>
    )
}


function CreateCartButton() {
    const [cartId, setCartId] = useState("");
  
    async function createCart(){
        const url = "http://localhost:8080/createEmptyCart";
        try {
            const response = await axios.get(url);
            console.log(response);
            const cartId = response.data.cartId;
            setCartId(cartId);
            localStorage.setItem("cartId", cartId);
          } catch (error) {
            console.error(error);
          }
    }
    

    return (
        <div>
            <button onClick={(e) => createCart(e)} id="createCart">Start Shopping</button>
        </div>
    )
}
function App() {
    return (
        <div>
            <CreateCartButton />
            <ShoppingListInput />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));