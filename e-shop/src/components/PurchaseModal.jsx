// PurchaseModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../CSS/PurchaseModal.css'; // Import the corresponding CSS file

Modal.setAppElement('#root'); // Set the root element for accessibility

const PurchaseModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the form data
    onSubmit({ name, email, address, paymentMethod });
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Purchase Modal"
      className="purchase-modal"
    >
      <h2>Enter Your Information</h2>
      <p>Please provide your information to complete the purchase.</p>
      <form onSubmit={handleFormSubmit} className="purchase-form">
        <label className="purchase-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="purchase-input" />
        </label>
        <label className="purchase-label">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="purchase-input" />
        </label>
        <label className="purchase-label">
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="purchase-input" />
        </label>
        <label className="purchase-label">
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="purchase-input">
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            {}
          </select>
        </label>
        <button type="submit" className="purchase-button">Complete Purchase</button>
      </form>
    </Modal>
  );
};

export default PurchaseModal;
