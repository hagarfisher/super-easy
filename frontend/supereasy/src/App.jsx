import CartButton from "./components/CartButton";
import { useState } from "react";
import ShoppingListInput from "./components/ShoppingListInput";
import "./App.css"

export default function App() {
  const [isCartExist, setIsCartExist] = useState(localStorage.getItem("cartId") !== "");
  // const isCartExist = localStorage.getItem("cartId");
  function toggleCartButton() {
    setIsCartExist(prevCartId => !prevCartId)
  }

  return (
    <div className="app">
      {!isCartExist ? <CartButton /> : <ShoppingListInput />}
    </div>
  )
}