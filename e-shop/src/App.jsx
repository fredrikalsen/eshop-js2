import React from 'react';
import Navbar from './Navbar';
import Products from './pages/Products';
import Home from './pages/Home';
import ContactForm from './pages/ContactForm';
import Cart from "./pages/Cart";
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register'; 
import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import OrderHistory from './components/OrderHistory';



function App() {
  return (
    <CartProvider>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contactform" element={<ContactForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </>
    </CartProvider>
  );
}

export default App;
