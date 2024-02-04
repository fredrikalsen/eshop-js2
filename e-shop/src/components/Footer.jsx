import React from 'react';
import "../CSS/Footer.css"

const Footer = () => {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@techstore.com</p>
            <p>Phone: +46 70 123 45 67</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>123 Tech Street</p>
            <p>Sweden, Stockholm</p>
          </div>
        </div>
        <p className="footer-copyright">&copy; 2024 Tech Store</p>
      </footer>
    );
  };

export default Footer;