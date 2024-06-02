import React, { useState } from 'react';
import './ManageInventory.css';

const initialItems = [
  { id: 1, campus: 'Davis', type: 'Chargers', description: 'Black charger', dateLost: '2024-05-01' },
  { id: 2, campus: 'HMC', type: 'Bottles', description: 'Blue water bottle', dateLost: '2024-05-02' },
  { id: 3, campus: 'Trafalgar', type: 'Wallets', description: 'Brown leather wallet', dateLost: '2024-05-03' },
];

function ManageInventory() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({
    campus: '',
    type: '',
    description: '',
    dateLost: '',
  });
  const [editingItem, setEditingItem] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setNewItem({ campus: '', type: '', description: '', dateLost: '' });
  };

  const handleEditItem = (id) => {
    const item = items.find(item => item.id === id);
    setEditingItem(item);
    setNewItem(item);
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();
    setItems(items.map(item => (item.id === editingItem.id ? newItem : item)));
    setEditingItem(null);
    setNewItem({ campus: '', type: '', description: '', dateLost: '' });
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="manage-inventory-container">
      <h2>Manage Inventory</h2>
      <form onSubmit={editingItem ? handleSaveEdit : handleAddItem} className="item-form">
        <div className="form-group">
          <label htmlFor="campus">Campus</label>
          <select id="campus" name="campus" value={newItem.campus} onChange={handleChange} required>
            <option value="">Select Campus</option>
            <option value="Davis">Davis</option>
            <option value="HMC">HMC</option>
            <option value="Trafalgar">Trafalgar</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Item Type</label>
          <select id="type" name="type" value={newItem.type} onChange={handleChange} required>
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
          <label htmlFor="dateLost">Date Lost</label>
          <input
            type="date"
            id="dateLost"
            name="dateLost"
            value={newItem.dateLost}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">{editingItem ? 'Save Changes' : 'Add Item'}</button>
      </form>
      <div className="items-list">
        {items.map(item => (
          <div key={item.id} className="item">
            <div><strong>Campus:</strong> {item.campus}</div>
            <div><strong>Type:</strong> {item.type}</div>
            <div><strong>Description:</strong> {item.description}</div>
            <div><strong>Date Lost:</strong> {item.dateLost}</div>
            <button onClick={() => handleEditItem(item.id)} className="edit-button">Edit</button>
            <button onClick={() => handleRemoveItem(item.id)} className="remove-button">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageInventory;
