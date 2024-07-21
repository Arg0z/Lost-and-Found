import React, { useState } from 'react';
import axios from 'axios';  
import './AddItem.css';

function AddItem() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemType, setItemType] = useState('');
  const [campus, setCampus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      description: itemDescription,
      category: itemType,
      location_found: campus,
      date_found: new Date().toISOString(), 
      photo_url: '',  
    };

    try {
      const response = await axios.post('https://lostandfoundback-184f1a940482.herokuapp.com/api/Items', newItem);
      if (response.status === 201) {
        console.log('Item added successfully');
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item-name">Item Name</label>
          <input
            type="text"
            id="item-name"
            name="item-name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="item-description">Item Description</label>
          <textarea
            id="item-description"
            name="item-description"
            rows="4"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="item-type">Item Type</label>
          <select
            id="item-type"
            name="item-type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select item type
            </option>
            <option value="Charger">Charger</option>
            <option value="Bottle">Bottle</option>
            <option value="Wallet">Wallet</option>
            <option value="Backpack">Backpack</option>
            <option value="Hat">Hat</option>
            <option value="Gloves">Gloves</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="campus">Select Campus</label>
          <select
            id="campus"
            name="campus"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your campus
            </option>
            <option value="Davis">Davis</option>
            <option value="HMC">HMC</option>
            <option value="Trafalgar">Trafalgar</option>
          </select>
        </div>
        <button type="submit" className="add-button">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
