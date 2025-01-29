import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductList from "../element/productList";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        data.forEach((category) => {
          fetch(
            `https://fakestoreapi.com/products/category/${category}?limit=1`
          )
            .then((res) => res.json())
            .then((products) => {
              setCategoryImages((prev) => ({
                ...prev,
                [category]: products[0]?.image || "",
              }));
            })
            .catch((error) =>
              console.log(
                `Err[category]: Failed to get image for ${category}:`,
                error
              )
            );
        });
      })
      .catch((error) => console.log("Err[category]:", error));
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="category-page">
      <h2>Shop by Category</h2>

      <div className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-tile"
            onClick={() => setSelectedCategory(category)}
          >
            <img
              src={
                categoryImages[category] || "https://placehold.co/600x400/png"
              }
              alt={category}
            />
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="product-wrapper">
          <div className="option-container">
            <div className="sort ml-auto">
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
          <div className="products mt-8">
            <h3>
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}{" "}
              Products
            </h3>
            <Suspense fallback={<div>Loading items...</div>}>
              <ProductList
                sortOrder={sortOrder}
                selectedCategory={selectedCategory}
                onAddToCart={handleAddToCart}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
