import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../components/CartContext'; 
import '../CSS/Products.css';
import Footer from '../components/Footer';
import productImage from '../products.jpg';

export default function Products() {
  const { addToCart } = useCartContext(); 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://js2-ecommerce-api.vercel.app/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); 
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCategoryFilter = (selectedCategory) => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products); 
    } else {
      
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <img src={productImage} alt="Placeholder" className="product-image" />

      <div className="products-container">
        <h1 className="products-heading">Products</h1>   
        <div className="category-filter-container">
          <label htmlFor="category" className="category-filter-label">Filter by Category:</label>
          <select id="category" className="category-filter-select" onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-box">
              <Link to={`/products/${product._id}`}>
                <img src={product.images[0]} alt={`Product 1`} />
              </Link>
              <div key={product._id} className="product-details">
                <h3>{product.name}</h3>
                <p className="product-prices">{product.price} Kr</p>
                <Link to={`/products/${product._id}`}>
                  <button className="view-button">View</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
