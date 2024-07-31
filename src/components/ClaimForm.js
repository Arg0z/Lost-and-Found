import React, { useState } from 'react';
import axios from 'axios';
import './ClaimForm.css';
import LoadingIndicator from './LoadingIndicator';

function ClaimForm() {
  const [formData, setFormData] = useState({
    dateLost: '',
    campus: '',
    itemType: '',
    description: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const itemId = Math.floor(Math.random() * 1000) + 1; 
    try {
      const response = await axios.post('https://lostandfoundback-184f1a940482.herokuapp.com/api/Claims', {
        userId: userId,
        itemId: itemId,
        description: formData.description,
        date_found: formData.dateLost,
        location_found: formData.campus,
        category: formData.itemType,
        status: 0
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        setSuccessMessage('Claim submitted successfully');
      } else {
        console.error('Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      setError('Failed to submit claim');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <LoadingIndicator isLoading={isLoading} />
      <h2>Claiming Application</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dateLost">Date lost</label>
          <input type="date" id="dateLost" name="dateLost" value={formData.dateLost} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="campus">Select Campus</label>
          <select id="campus" name="campus" value={formData.campus} onChange={handleChange} required>
            <option value="" disabled>Select your campus</option>
            <option value="Davis">Davis</option>
            <option value="HMC">HMC</option>
            <option value="Trafalgar">Trafalgar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="itemType">Select Item Type</label>
          <select id="itemType" name="itemType" value={formData.itemType} onChange={handleChange} required>
            <option value="" disabled>Select item type</option>
            <option value="Charger">Charger</option>
            <option value="Bottle">Bottle</option>
            <option value="Wallet">Wallet</option>
            <option value="Backpack">Backpack</option>
            <option value="Hat">Hat</option>
            <option value="Gloves">Gloves</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" className="apply-button">Apply</button>
      </form>
    </div>
  );
}

export default ClaimForm;
