import { useAppDispatch } from "../hooks/hooks";
import { addToCart } from "../store/cart-slice";

type ProductProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
};

export default function Product({
  image,
  title,
  price,
  description,
  id,
}: ProductProps) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(addToCart({ id, title, price }));
  }

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
