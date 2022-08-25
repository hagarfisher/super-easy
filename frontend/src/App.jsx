import axios from "axios";
import { useState } from "react";
import CartButton from "./components/CartButton";
import ShoppingListInput from "./components/ShoppingListInput";
import { extensionId } from "./utils/constants";

import "./App.css";
import { Spinner } from "react-bootstrap";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const cartId = localStorage.getItem("cartId");
  const defaultCartState = !!cartId;
  const [doesCartExist, setDoesCartExist] = useState(defaultCartState);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, getAccessTokenWithPopup } = useAuth0();


  async function createCart() {
    const accessToken = await getAccessTokenWithPopup({
      audience: 'http://localhost:8080',
      scope: "read:current_user",
    });
    console.log(accessToken);
    const url = "http://localhost:8080/createEmptyCart";
    try {
      setIsLoading(true);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <LogoutButton />}
      {doesCartExist ? <ShoppingListInput /> : <CartButton createCart={createCart} />}
      <button onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}>Clear local storage</button>
    </div>
  )
}