import axios from "axios";
import { useState } from "react";
import { EmptyCart } from "../types/EmptyCart";

export default function CartButton() {
  // const [cartId, setCartId] = useState("");

  async function createCart() {
    const url = "http://localhost:8080/createEmptyCart";
    try {
      const response = await axios.get<EmptyCart>(url);
      console.log(response);
      const cartId = response.data.cartId;
      // setCartId(cartId);
      localStorage.setItem("cartId", cartId);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <button onClick={(e) => createCart()} id="createCart">Start Shopping</button>
    </div>
  )
}