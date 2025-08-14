import styles from "./ProductList.module.css";
import { Product } from "./Product.jsx";
import { CircularProgress } from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../../service/CartContext";

export function ProductList() {
  const { products, loading, error } = useContext(CartContext);

  const searchInput = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function handleSearchChange() {
    const query = searchInput.current.value.toLowerCase();
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }

  function handleClear() {
    searchInput.current.value = "";
    setFilteredProducts(products);
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          ref={searchInput}
          placeholder="Search products..."
          onChange={handleSearchChange}
        />
        <button onClick={handleClear}>Clear</button>
      </div>
      <div className={styles.main}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{
              color: "#001111",
            }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}