import React from 'react';
import './ClaimForm.css';

function ClaimForm() {
  return (
    <div className="form-container">
      <h2>Claiming Application</h2>
      <form>
        <div className="form-group">
          <label htmlFor="date-lost">Date lost</label>
          <input type="date" id="date-lost" name="date-lost" required />
        </div>
        <div className="form-group">
          <label htmlFor="campus">Select Campus</label>
          <select id="campus" name="campus" required>
            <option value="" disabled selected>Select your campus</option>
            <option value="Davis">Davis</option>
            <option value="HMC">HMC</option>
            <option value="Trafalgar">Trafalgar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="item-type">Select Item Type</label>
          <select id="item-type" name="item-type" required>
            <option value="" disabled selected>Select item type</option>
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
          <textarea id="description" name="description" rows="4" required></textarea>
        </div>
        <button type="submit" className="apply-button">Apply</button>
      </form>
    </div>
  );
}

export default ClaimForm;
