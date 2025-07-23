import styles from "./Cart.module.css";
import { useState } from "react";

export function Cart({ cart, removeFromCart, addToCart }) {
  // Agrupar produtos por ID e contar quantidades
  const productMap = {};
  cart.forEach((product) => {
    if (productMap[product.id]) {
      productMap[product.id].qty += 1;
    } else {
      productMap[product.id] = { ...product, qty: 1 };
    }
  });

  const uniqueProducts = Object.values(productMap);
  const total = uniqueProducts.reduce(
    (sum, product) => sum + product.price * product.qty,
    0
  );

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Shopping Cart</h2>

      {uniqueProducts.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {uniqueProducts.map((product) => (
              <li key={product.id} className={styles.cartItem}>
                <img
                  src={product.thumbnail || ""}
                  alt={product.title || "Product Image"}
                />
                <h3>{product.title}</h3>

                {product.qty > 1 && (
                  <button onClick={() => removeFromCart(product)}>-</button>
                )}

                <p>{product.qty}</p>
                <button onClick={() => addToCart(product)}>+</button>

                <p>${(product.price * product.qty).toFixed(2)}</p>

                <button
                  onClick={() => {
                    removeFromCart(product, product.qty);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.checkout}>
            <h1>Resumo:</h1>
            <ul>
              {uniqueProducts.map((product) => (
                <li
                  key={product.id}
                  style={{ fontSize: "2rem", marginBottom: "1rem" }}
                >
                  <strong>{product.title}</strong> — {product.qty}x — $
                  {(product.price * product.qty).toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button>Continuar</button>
          </div>
        </>
      )}
    </div>
  );
}
