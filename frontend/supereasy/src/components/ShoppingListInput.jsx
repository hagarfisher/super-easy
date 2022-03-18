import axios from "axios";
import React, { useState } from "react";

// interface Props {
//   cartId: string;
// }

export default function ShoppingListInput() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productQuantity, setQuantity] = useState(0);

  async function addProduct() {
    setProducts([...products, { name: productName, quantity: productQuantity }]);
  }
  function addToCart() {
    const cartId = localStorage.getItem("cartId");
    axios.post("http://localhost:8080/cart/add", { cartId, products });

  }
  return (
    <div>
      <input onChange={(e) => setProductName(e.target.value)} type="text" id="productName" placeholder="Enter product name" />
      <input onChange={(e) => setQuantity(+e.target.value)} type="number" id="productQuantity" placeholder="Enter product quantity" />
      <button onClick={() => addProduct()} id="addProduct">Add product</button>
      <button onClick={() => addToCart()}>Add to cart</button>
    </div>
  )
}

