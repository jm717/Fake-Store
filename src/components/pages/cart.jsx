import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Modal from "../element/modal";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const cartPriceTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="empty-cart-wrapper">
          <h2> Your cart is empty. </h2>
          <Link to="/products" className="ctn-shp-btn">
            {" "}
            Continue Shopping{" "}
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-summary-wrapper">
            <h2>Your Cart</h2>
            <ul className="divide-y">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-wrapper">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <span>{item.title}</span>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="qty-wrapper">
                    <div className="qty-counter">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="hover:text-red-500"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="hover:text-green-500"
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}>
                      {" "}
                      Remove{" "}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-wrapper">
            <h3>Order Summary</h3>
            <div className="divide-y">
              <div className="order-summary-tab">
                <span>Subtotal:</span>
                <span className="font-sans">${cartPriceTotal.toFixed(2)}</span>
              </div>
              <div className="order-summary-tab">
                <span>Shipping:</span>
                <span className="text-sm">Free</span>
              </div>
              <div className="order-summary-tab">
                <span>Tax: </span>
                <span className="text-sm">Calculated at checkout</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span className="font-sans">
                  CAD ${cartPriceTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button onClick={openPaymentModal} className="checkout-btn">
              {" "}
              Proceed to Checkout{" "}
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        title="Payment Gateway"
      >
        <p>You're almost there!</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={closePaymentModal}
            className="bg-red-500 text-white text-sm py-1 px-3 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
