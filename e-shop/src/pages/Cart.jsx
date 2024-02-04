import React from 'react';
import { useCartContext } from '../components/CartContext';
import { MdDelete } from 'react-icons/md';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Import Link
import "../CSS/cart.css"

const Cart = () => {
  const { cartState, removeFromCart, clearCart } = useCartContext();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart ({cartState.cartItems.length} items)</h1>
      {cartState.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {cartState.cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="cart-item">
              <img src={item.images[0]} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} :-</span>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
       <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
      <p>Total Price: {cartState.cartItems.reduce((total, item) => total + parseFloat(item.price), 0)} Kr</p>
      <Link to="/checkout" className='checkout-link'>Go to Checkout</Link>
      <Footer />
    </div>
  );
};

export default Cart;
