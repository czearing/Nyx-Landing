import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  // A function to handle checkout. Here, you'd implement actual checkout logic.
  const checkout = () => {
    alert('Proceeding to checkout');
    // Here, you can clear the cart or initiate the checkout process.
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - Quantity: {item.quantity}
              {/* Implement features to increase/decrease quantity or remove from cart */}
            </li>
          ))}
        </ul>
      )}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
