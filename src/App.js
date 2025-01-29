import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/layout";
import Home from "./components/pages/home";
import Products from "./components/pages/product";
import Category from "./components/pages/category";
import Cart from "./components/pages/cart";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
