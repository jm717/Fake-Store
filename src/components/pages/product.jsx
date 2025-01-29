import React, { useEffect, useState, Suspense } from "react";
import "./style.css";
import { useCart } from "../../context/CartContext";
import Modal from "../element/modal";

const ProductList = React.lazy(() => import("../element/productList"));

const Product = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log("Error fetching categories:", error));
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="product-wrapper">
      <div className="option-container">
        <div className="filter">
          <span className="label">Filter By</span>
          <select
            value={selectedCategory}
            onChange={handleFilterChange}
            className="dropdown"
          >
            <option value="">Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="sort">
          <span className="label">Sort By</span>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="dropdown"
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      <Suspense fallback={<div>Loading items...</div>}>
        <ProductList
          sortOrder={sortOrder}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
        />
      </Suspense>
    </div>
  );
};

export default Product;
