import React, { useState } from 'react';
import axios from 'axios';
import './ClaimForm.css';

function ClaimForm() {
  const [formData, setFormData] = useState({
    itemId: '',
    dateLost: '',
    campus: '',
    itemType: '',
    description: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post('https://sheridanlostandfound.azurewebsites.net/api/Claims', {
        userId: userId,
        itemId: formData.itemId,
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
        console.log('Claim submitted successfully');
      } else {
        console.error('Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Claiming Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemId">Item ID</label>
          <input
            type="text"
            id="itemId"
            name="itemId"
            value={formData.itemId}
            onChange={handleChange}
            required
          />
        </div>
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
