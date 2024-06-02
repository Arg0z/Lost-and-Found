import React, { useState } from 'react';
import './AddAdmin.css';

function AddAdmin() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the email to the server to add the user as an admin.
    console.log(`Admin with email ${email} added.`);
    setEmail('');
  };

  return (
    <div className="add-admin-container">
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit} className="add-admin-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-admin-button">Add Admin</button>
      </form>
    </div>
  );
}

export default AddAdmin;
