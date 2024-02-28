import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";

import Cart from "./Cart";

export default function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const totalCartItems = useAppSelector((state) =>
    state.cart.items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0)
  );

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({totalCartItems})</button>
        </p>
      </header>
    </>
  );
}
