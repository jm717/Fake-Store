import React, { useEffect, useState } from "react";
import "./style.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-wrapper">
      <div
        className="product-card"
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <div className="product-image">
          <img src={product.image} alt={product.title} />
          {isCardHovered && (
            <div className="product-hover-panel">
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                ADD TO CART
              </button>
            </div>
          )}
        </div>
        <div className="product-details">
          <div className="product-title">{product.title}</div>
          <div className="product-price">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
