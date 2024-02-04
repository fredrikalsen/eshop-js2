import React, { useState, useEffect } from 'react';
import { useCartContext } from '../components/CartContext';
import Footer from '../components/Footer';
import '../CSS/OrderHistory.css';

function OrderHistory() {
  const { cartState } = useCartContext();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmQ0MDFiZWFiMzIyZjA0MzJlZmVkMyIsImlhdCI6MTcwNzA1OTA2NiwiZXhwIjoxNzEwNTE1MDY2fQ.PMj1Y-y7ByWpYNUhLzO9VB7HRTTrRMYkPYb_zk2udME`,
          },
        });

        if (response.ok) {
          const orders = await response.json();
          setOrderHistory(orders);
        } else {
          console.error('Error fetching order history:', response.status);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    };

    fetchOrders();
  }, [cartState]); 

  return (
    <>
    <div className="order-history-container">
      <h1>Order History</h1>
      {orderHistory.map((order) => (
        <div key={order._id} className="order-item">
          <p>Order Number: {order._id}</p>
          <p>Number of Products: {order.products.length}</p>
          <p>Total Price: {order.totalPrice} Kr</p>
          {}
        </div>
      ))}
      
    </div>
    <Footer />
    </>
  );
}

export default OrderHistory;
