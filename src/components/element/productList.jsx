import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import "./style.css";

const ProductList = React.memo(({ sortOrder, selectedCategory }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    // @todo:create env var
    let url = "https://fakestoreapi.com/products";

    if (selectedCategory) url += `/category/${selectedCategory}`;

    // sorts by item id, not title
    if (sortOrder) url += `?sort=${sortOrder}`;

    const res = await fetch(url);
    const data = await res.json();
    // @todo: immutation: same reference, react won't trigger re-render
    setProducts([...data]);
  };

  // @todo: check warning seen in terminal
  useEffect(() => {
    fetchProducts();
  }, [sortOrder, selectedCategory]);

  return (
    <div>
      <h1 className="p-1">All Items</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
});

export default ProductList;

/** notes:
 * 
 * Add Pagination
 * a better way to fetch products, axios?
 * add lazy loading for each item
 * a search bar

 */
