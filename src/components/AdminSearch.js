import React, { useState } from 'react';
import './AdminSearch.css';

const mockData = [
  { id: 1, campus: 'Davis', type: 'Chargers', description: 'Black charger', dateLost: '2024-05-01' },
  { id: 2, campus: 'HMC', type: 'Bottles', description: 'Blue water bottle', dateLost: '2024-05-02' },
  { id: 3, campus: 'Trafalgar', type: 'Wallets', description: 'Brown leather wallet', dateLost: '2024-05-03' },

];

function AdminSearch() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    const campus = form.elements['campus'].value;
    const type = form.elements['type'].value;
    const dateLost = form.elements['date-lost'].value;

    const results = mockData.filter(item => {
      return (
        (!campus || item.campus === campus) &&
        (!type || item.type === type) &&
        (!dateLost || item.dateLost === dateLost)
      );
    });

    setSearchResults(results);
  };

  return (
    <div className="search-container">
      <h2>Admin Item Search</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="campus">Campus</label>
          <select id="campus" name="campus">
            <option value="">All</option>
            <option value="Davis">Davis</option>
            <option value="HMC">HMC</option>
            <option value="Trafalgar">Trafalgar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Item Type</label>
          <select id="type" name="type">
            <option value="">All</option>
            <option value="Chargers">Chargers</option>
            <option value="Bottles">Bottles</option>
            <option value="Wallets">Wallets</option>
            <option value="Backpacks">Backpacks</option>
            <option value="Hats">Hats</option>
            <option value="Gloves">Gloves</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date-lost">Date Lost</label>
          <input type="date" id="date-lost" name="date-lost" />
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map(item => (
            <div key={item.id} className="search-result-item">
              <div><strong>Campus:</strong> {item.campus}</div>
              <div><strong>Type:</strong> {item.type}</div>
              <div><strong>Description:</strong> {item.description}</div>
              <div><strong>Date Lost:</strong> {item.dateLost}</div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminSearch;
