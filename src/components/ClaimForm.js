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
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" required></textarea>
        </div>
        <button type="submit" className="apply-button">Apply</button>
      </form>
    </div>
  );
}

export default ClaimForm;
