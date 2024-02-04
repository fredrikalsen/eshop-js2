import React, { useEffect, useState } from 'react';
import homeImage from '../homepage.jpg';
import '../CSS/Home.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://js2-ecommerce-api.vercel.app/api/products');
        const firstFourProducts = response.data.slice(0, 10);
        setSelectedProducts(firstFourProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
     
      
     
      <div className="image-container">
        <div className="text-container">
          <p>Welcome to the Tech Store</p>
          <h1>Premier Tech<br></br> Selection.</h1>
          <Link to="/products" className="view-products-button">View Products</Link>
        </div>
        <img src={homeImage} alt="Welcome Image" className="welcome-image" />
      </div>
  
     
      <h1 className="selected-products">Selected Products</h1>
    
    
      <div className="selected-products-container">
      {selectedProducts.map((product) => (
  <div key={product._id} className="product-item">
    <Link to={`/products/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image-home"
        />
    </Link>
    <p>{product.name}</p>
  </div>
))}
      </div>
    
     
      <Link to="/products" className="button-container">
        <button>Discover More</button>
      </Link>
      <Footer />
    </div>
  );
  
}

export default Home;
