import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewClaims.css';

function ViewClaims() {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('https://localhost:7224/api/Claims', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setClaims(response.data);
      } catch (error) {
        setError('Failed to fetch claims');
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="view-claims-container">
      <h2>View Submitted Claims</h2>
      {error && <p className="error">{error}</p>}
      {claims.length === 0 ? (
        <p>No claims submitted yet.</p>
      ) : (
        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>User ID</th>
              <th>Item ID</th>
              <th>Description</th>
              <th>Date Found</th>
              <th>Location Found</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={index}>
                <td>{claim.claimId}</td>
                <td>{claim.userId}</td>
                <td>{claim.itemId}</td>
                <td>{claim.description}</td>
                <td>{new Date(claim.date_found).toLocaleDateString()}</td>
                <td>{claim.location_found}</td>
                <td>{claim.category}</td>
                <td>{claim.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewClaims;
