import React, { useState, useEffect, Suspense } from "react";
import ProductList from "../element/productList";

const Category = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // mapping { mens: "img.jpg", womens: "img2.jpg" }
  const [categoryImages, setCategoryImages] = useState({});
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
        data.forEach((category) => {
          fetch(
            `https://fakestoreapi.com/products/category/${category}?limit=1`
          )
            .then((res) => res.json())
            .then((product) => {
              setCategoryImages((prev) => ({
                ...prev,
                [category]: product[0]?.image || "",
              }));
            })
            .catch((err) =>
              console.log(
                `Err[category]: Failed to get image for ${category}:`,
                err
              )
            );
        });
      })
      .catch((error) =>
        console.log("Err[category]: Failed to get all categories", error)
      );
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="category-page">
      <h2>Shop by Category</h2>

      <div className="categories">
        {allCategories.map((category, index) => (
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
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
