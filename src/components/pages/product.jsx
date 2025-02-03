import React, { useEffect, useState, Suspense } from "react";
import "./style.css";

const ProductList = React.lazy(() => import("../element/productList"));

const Product = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setAllCategories(data))
      .catch((err) =>
        console.log("Err[product]: Failed to fetch categories", err)
      );
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="product-wrapper">
      <div className="option-container">
        <div className="filter">
          <span className="label">Filter By</span>
          <select
            name="filter-dropdown"
            value={selectedCategory}
            onChange={handleFilterChange}
            className="dropdown"
          >
            <option value="">Category</option>
            {allCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="sort">
          <span className="label">Sort By</span>
          <select
            name="sort-dropdown"
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
        />
      </Suspense>
    </div>
  );
};

export default Product;
