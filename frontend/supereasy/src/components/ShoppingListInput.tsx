import axios from "axios";
import React, { useState } from "react";

interface Props {
  cartId: string;
}

export default function ShoppingListInput(props: Props) {
  const [products, setProducts] = useState([]);
  
  async function addProduct() {
    const url = "http://localhost:8080/list";
    try {
      const response = await axios.post(url, products);
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
      <button onClick={() => addProduct()} id="addProduct">Add product</button>
    </div>
  )
}

