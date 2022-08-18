import axios from "axios";
import { useState } from "react";
import CartButton from "./components/CartButton";
import ShoppingListInput from "./components/ShoppingListInput";
import { extensionId } from "./utils/constants";

import "./App.css";
import { Spinner } from "react-bootstrap";

export default function App() {
  const cartId = localStorage.getItem("cartId");
  const defaultCartState = !!cartId;
  const [doesCartExist, setDoesCartExist] = useState(defaultCartState);
  const [isLoading, setIsLoading] = useState(false);


  async function createCart() {
    const url = "http://localhost:8080/createEmptyCart";
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      console.log(response);
      const cartId = response.data.cartId;
      setDoesCartExist(true);
      localStorage.setItem("cartId", cartId);
      window.chrome.runtime.sendMessage(extensionId, { cartId },
        function (response) {
          if (!response.success) {
            console.error(url);
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <div style={{ width: '100vw', textAlign: 'center', marginTop: '5%' }}><Spinner animation="border" /></div>;
  }
  return (
    <div className="app">
      {doesCartExist ? <ShoppingListInput /> : <CartButton createCart={createCart} />}
      {/* <button onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}>Clear local storage</button> */}
    </div>
  )
}