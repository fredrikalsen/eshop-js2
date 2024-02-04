import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/CartContext.jsx';


const root = createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
        <App />
    </CartProvider>  
    </BrowserRouter>
  </React.StrictMode>
);
