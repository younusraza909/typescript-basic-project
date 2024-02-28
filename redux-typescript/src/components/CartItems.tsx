import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addToCart, Item, removeFromCart } from "../store/cart-slice";

export default function CartItems() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  function handleRemoveFromCart(id: string) {
    dispatch(removeFromCart(id));
  }

  function handleAddToCart({ id, quantity, title, price }: Item) {
    dispatch(addToCart({ id, title, price }));
  }

  const totalPrice = useAppSelector((state) =>
    state.cart.items.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0)
  );

  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <div id="cart">
      <p>No items in cart!</p>
      <ul id="cart-items">
        {cartItems.map((item) => {
          const formattedPrice = `$${item.price.toFixed(2)}`;

          return (
            <li key={item.id}>
              <div>
                <span>{item.title}</span>
                <span> ({formattedPrice})</span>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleAddToCart(item)}>+</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
