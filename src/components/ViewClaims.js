import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewClaims.css';

function ViewClaims() {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    itemId: '',
    userId: '',
    status: '',
  });
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [editFormData, setEditFormData] = useState({
    description: '',
    date_found: '',
    location_found: '',
    category: '',
    status: 0,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('https://lostandfoundback-184f1a940482.herokuapp.com/api/Claims/Filters', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: filters
        });
        setClaims(response.data);
      } catch (error) {
        setError('Failed to fetch claims');
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, [filters]);

  const handleEditClick = (claim) => {
    setSelectedClaim(claim);
    setEditFormData({
      description: claim.description,
      date_found: new Date(claim.date_found).toISOString().split('T')[0],
      location_found: claim.location_found,
      category: claim.category,
      status: claim.status,
      userId: claim.userId 
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.put(`https://lostandfoundback-184f1a940482.herokuapp.com/api/Claims/${selectedClaim.claimId}`, {
        claimId: selectedClaim.claimId,
        description: editFormData.description,
        date_found: editFormData.date_found,
        location_found: editFormData.location_found,
        category: editFormData.category,
        status: parseInt(editFormData.status, 10),
        userId: editFormData.userId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 204) {
        setClaims(claims.map(claim => 
          claim.claimId === selectedClaim.claimId ? { ...claim, ...editFormData } : claim
        ));
        setSelectedClaim(null);
      } else {
        console.error('Failed to update claim');
      }
    } catch (error) {
      setError('Failed to update claim');
      console.error('Error updating claim:', error);
    }
  };

  return (
    <div className="view-claims-container">
      <h2>View Submitted Claims</h2>
      {error && <p className="error">{error}</p>}

      <div className="filters-container">
        <input
          type="number"
          placeholder="Item ID"
          name="itemId"
          value={filters.itemId}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="User ID"
          name="userId"
          value={filters.userId}
          onChange={handleFilterChange}
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="0">New</option>
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
          <option value="3">Pending</option>
        </select>
      </div>

      {selectedClaim && (
        <div className="edit-form-container">
          <h3>Edit Claim</h3>
          <form onSubmit={handleEditFormSubmit}>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={editFormData.description}
                onChange={handleEditFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_found">Date Found</label>
              <input
                type="date"
                id="date_found"
                name="date_found"
                value={editFormData.date_found}
                onChange={handleEditFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location_found">Location Found</label>
              <input
                type="text"
                id="location_found"
                name="location_found"
                value={editFormData.location_found}
                onChange={handleEditFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={editFormData.category}
                onChange={handleEditFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={editFormData.status}
                onChange={handleEditFormChange}
              >
                <option value="0">New</option>
                <option value="1">Approved</option>
                <option value="2">Rejected</option>
                <option value="3">Pending</option>
              </select>
            </div>
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setSelectedClaim(null)}>Cancel</button>
          </form>
        </div>
      )}

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
              <th>Actions</th>
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
                <td>
                  <button onClick={() => handleEditClick(claim)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewClaims;
