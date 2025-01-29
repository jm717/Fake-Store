import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./layout.css";
import { useCart } from "../../context/CartContext";

const Layout = () => {
  const { getQuantity } = useCart();
  const itemsInCart = getQuantity();

  return (
    <div className="navbar">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
        </ul>

        <div className="nav-title">
          <h1>FAKE STORE</h1>
        </div>
        <div className="panel-right">
          <div>
            <Link to="/cart" className="cart-link">
              <ShoppingCart className="cart-icon" />
              {itemsInCart > 0 && (
                <span className="cart-number">{itemsInCart}</span>
              )}
            </Link>
          </div>
          <button className="login">Login</button>
        </div>
      </nav>

      <div>
        <Outlet />
      </div>

      <footer className="footer">Footer Content</footer>
    </div>
  );
};

export default Layout;
