import styles from "./Product.module.css";
import { useState } from "react";

export function Product({ product, addToCart, removeFromCart }) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(0);

  const handleAdd = () => {
    addToCart(product);
    setQty(qty + 1);
    setAdded(true);
  };

  const handleRemove = () => {
    if (qty > 0) {
      removeFromCart(product);
      setQty(qty - 1);
      if (qty - 1 === 0) {
        setAdded(false);
      }
    }
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.thumbnail || ""}
        alt={product.title || "Product image"}
        className={styles.productImage}
      />
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>

      <div className={styles.productQty}>
        <p className={styles.productPrice}>
          ${qty === 0 ? product.price : (product.price * qty).toFixed(2)}
        </p>

        {added && (
          <div className={styles.productQtyControls}>
            <button onClick={handleRemove}>-</button>
            <p>{qty}</p>
            <button onClick={handleAdd}>+</button>
          </div>
        )}
      </div>

      {!added && (
        <button className={styles.productButton} onClick={handleAdd}>
          ADD TO CART
        </button>
      )}
    </div>
  );
}
