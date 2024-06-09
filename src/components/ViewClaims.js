import React, { useState, useEffect } from 'react';
import './ViewClaims.css';

function ViewClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const storedClaims = JSON.parse(localStorage.getItem('claims')) || [];
    setClaims(storedClaims);
  }, []);

  return (
    <div className="view-claims-container">
      <h2>View Submitted Claims</h2>
      {claims.length === 0 ? (
        <p>No claims submitted yet.</p>
      ) : (
        <table className="claims-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Item Type</th>
              <th>Campus</th>
              <th>Date Lost</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={index}>
                <td>{claim.itemName}</td>
                <td>{claim.itemDescription}</td>
                <td>{claim.itemType}</td>
                <td>{claim.campus}</td>
                <td>{claim.dateLost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewClaims;
