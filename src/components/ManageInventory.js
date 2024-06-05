import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageInventory.css';

function ManageInventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    description: '',
    date_found: '',
    location_found: '',
    category: '',
    photo_url: ''
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://localhost:7224/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7224/api/items', newItem);
      fetchItems(); 
      setNewItem({ description: '', date_found: '', location_found: '', category: '', photo_url: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleEditItem = (id) => {
    const item = items.find(item => item.item_id === id);
    setEditingItem(item);
    setNewItem(item);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7224/api/items/${editingItem.item_id}`, newItem);
      fetchItems(); 
      setEditingItem(null);
      setNewItem({ description: '', date_found: '', location_found: '', category: '', photo_url: '' });
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://localhost:7224/api/items/${id}`);
      fetchItems(); // Refresh the item list after deleting an item
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="manage-inventory-container">
      <h2>Manage Inventory</h2>
      <form onSubmit={editingItem ? handleSaveEdit : handleAddItem} className="item-form">
        <div className="form-group">
          <label htmlFor="location_found">Campus</label>
          <select id="location_found" name="location_found" value={newItem.location_found} onChange={handleChange} required>
            <option value="">Select Campus</option>
            <option value="Davis">Davis</option>
            <option value="HMC">HMC</option>
            <option value="Trafalgar">Trafalgar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Item Type</label>
          <select id="category" name="category" value={newItem.category} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Chargers">Chargers</option>
            <option value="Bottles">Bottles</option>
            <option value="Wallets">Wallets</option>
            <option value="Backpacks">Backpacks</option>
            <option value="Hats">Hats</option>
            <option value="Gloves">Gloves</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newItem.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date_found">Date Lost</label>
          <input
            type="date"
            id="date_found"
            name="date_found"
            value={newItem.date_found}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">{editingItem ? 'Save Changes' : 'Add Item'}</button>
      </form>
      <div className="items-list">
        {items.map(item => (
          <div key={item.item_id} className="item">
            <div><strong>Campus:</strong> {item.location_found}</div>
            <div><strong>Type:</strong> {item.category}</div>
            <div><strong>Description:</strong> {item.description}</div>
            <div><strong>Date Lost:</strong> {new Date(item.date_found).toLocaleDateString()}</div>
            <button onClick={() => handleEditItem(item.item_id)} className="edit-button">Edit</button>
            <button onClick={() => handleRemoveItem(item.item_id)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageInventory;
