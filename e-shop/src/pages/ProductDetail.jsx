import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartContext } from '../components/CartContext'; // Uppdatera sökvägen
import Footer from '../components/Footer';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import '../CSS/ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCartContext(); // Uppdatera till useCartContext

  useEffect(() => {
    fetch(`https://js2-ecommerce-api.vercel.app/api/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % (product?.images.length || 1));
  };

  const prevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + (product?.images.length || 1)) % (product?.images.length || 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      console.log('Product added to cart:', product);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="product-detail-container">
      <div className="product-info">
        <h1>{product.name}</h1>
        {product.images && (
          <div className="slideshow-container">
          <button onClick={prevImage}><FaArrowLeft /></button>
          <div className="slideshow-image">
            <img src={product.images[currentImage]} alt={`Product ${currentImage + 1}`} />
          </div>
          <button onClick={nextImage}><FaArrowRight /></button>
        </div>
        )}
        <div className='product-price'>
          <p>{product.price} Kr</p>
          <button className='Add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
  
      <div className='detail-product'>
        <h2>Description</h2>
        <p>{product.description}</p>
        
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ProductDetail;
