import React, { useState } from 'react';
import { useCartContext } from '../components/CartContext';
import Footer from '../components/Footer';
import PurchaseModal from '../components/PurchaseModal';
import { MdDelete } from 'react-icons/md';
import "../CSS/Checkout.css";

function Checkout() {
  const { cartState, removeFromCart, clearCart } = useCartContext();
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const handleProceedToPurchase = () => {
    if (cartState.cartItems.length > 0) {
      setPurchaseModalOpen(true);
    }
  };

  const handleClosePurchaseModal = () => {
    
    setPurchaseModalOpen(false);
  };

  const handlePurchaseSubmit = async (formData) => {
    try {
      const { name, email, address, paymentMethod } = formData;
      const cartItems = cartState.cartItems;
  
      console.log('User Data:', { name, email, address, paymentMethod });
      console.log('Cart Items:', cartItems);
  
      const products = cartItems.map((item) => ({
        productId: item._id || '', 
        quantity: 1, 
      }));
  
      console.log('Products:', products);
  
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmQ0MDFiZWFiMzIyZjA0MzJlZmVkMyIsImlhdCI6MTcwNzA1OTA2NiwiZXhwIjoxNzEwNTE1MDY2fQ.PMj1Y-y7ByWpYNUhLzO9VB7HRTTrRMYkPYb_zk2udME`, // Replace with your actual token
        },
        body: JSON.stringify({
          products,
        }),
      });
  
      if (response.ok) {
        console.log('Order successfully submitted!');
        
      } else {
        const errorData = await response.json();
        console.error('Error submitting order:', errorData);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };
  

  return (
    <div className="checkout-container">
      
      <h1>Checkout</h1>

      
      
      {cartState.cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {cartState.cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="cart-item-checkout">
              <img src={item.images[0]} alt={item.name} className="cart-item-checkout-image" />
              <div className="cart-item-details">
                <span className="item-name-checkout">{item.name}</span>
                <span className="item-price-checkout">{item.price} :-</span>
                <button onClick={() => removeFromCart(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleClearCart} className="clear-cart-button">Clear Cart</button>
      
      <p>Total Price: {cartState.cartItems.reduce((total, item) => total + parseFloat(item.price), 0)} Kr</p>
      
      <button onClick={handleProceedToPurchase}>Proceed to Purchase</button>

      

      {}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={handleClosePurchaseModal}
        onSubmit={handlePurchaseSubmit}
      />
      <Footer />
    </div>
  );
}

export default Checkout;
