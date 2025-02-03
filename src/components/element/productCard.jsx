import React, { useEffect, useState } from "react";
import "./style.css";
import { useCart } from "../../context/CartContext";

const ProductCard = React.memo(({ product }) => {
  // @todo: Use Css to hide and dislay
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
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
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
              >
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
});

export default ProductCard;
