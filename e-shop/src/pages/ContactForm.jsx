import React, { useState, useEffect } from 'react';
import '../CSS/ContactForm.css'; // Importera din CSS-fil för styling
import Footer from '../components/Footer';
import contactImage from '../contact.jpg';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isMessageSent, setIsMessageSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Namnet får inte vara tomt';
    }
    if (!formData.email.trim()) {
      errors.email = 'E-postadressen får inte vara tomt';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Ange en giltig e-postadress';
    }
    if (!formData.message.trim()) {
      errors.message = 'Meddelandet får inte vara tomt';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const apiResponse = await sendFormDataToApi(formData);
        console.log('API-svar:', apiResponse);

        setIsMessageSent(true);
      } catch (error) {
        console.error('Fel vid API-begäran:', error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setValidationErrors({
      name: '',
      email: '',
      message: '',
    });
  }, [formData]);

  const sendFormDataToApi = async (formData) => {
    try {
      const response = await fetch('http://localhost:9999/api/messages/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Fel vid API-anropet');
      }

      return response.json();
    } catch (error) {
      console.error('Fel vid API-anrop:', error);
      throw error;
    }
  };

  return (
    
    <div className="form-container">
      <div className='top-image-container'>
      <img src={contactImage} alt="Placeholder" className="top-image" />
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        {isMessageSent && <p className="success-message">Meddelandet har skickats!</p>}

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Namn:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          <p className="error-message">{validationErrors.name}</p>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-postadress:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          <p className="error-message">{validationErrors.email}</p>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Meddelande:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
          />
          <p className="error-message">{validationErrors.message}</p>
        </div>

        <button type="submit" className="submit-button-contact">
          Skicka
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default ContactForm;
