import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
// import { EmptyCart } from "../types/EmptyCart";i
import { extensionId } from "../utils/constants";
export default function CartButton() {
  // const [cartId, setCartId] = useState("");
    async function createCart() {
      const url = "http://localhost:8080/createEmptyCart";
      try {
        const response = await axios.get(url);
        console.log(response);
        const cartId = response.data.cartId;
        // setCartId(cartId);
        localStorage.setItem("cartId", cartId);
        window.chrome.runtime.sendMessage(extensionId, { cartId },
          function (response) {
            if (!response.success) {
              console.error(url);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }


    return (
      <div>
        <Button onClick={(e) => createCart()} id="createCart">Start Shopping</Button>
      </div>
    )
  }