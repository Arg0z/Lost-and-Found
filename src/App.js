import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Campus from './components/Campus';
import ItemDetail from './components/ItemDetail';
import ClaimForm from './components/ClaimForm';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import AdminSearch from './components/AdminSearch';
import AddAdmin from './components/AddAdmin';
import ManageInventory from './components/ManageInventory';
import ForgotPassword from './components/ForgotPassword';

import './App.css';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>SHERIDAN</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/forms">Forms</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <div className="dropdown">
              <button className="dropbtn" onClick={toggleDropdown}>Admin</button>
              <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                <Link to="/admin-search">Admin Search</Link>
                <Link to="/add-admin">Add Admin</Link>
                <Link to="/manage-inventory">Manage Inventory</Link>
              </div>
            </div>
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </nav>
        </header>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campus/:campusName" element={<Campus />} />
            <Route path="/campus/:campusName/:categoryName" element={<ItemDetail />} />
            <Route path="/forms" element={<ClaimForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-search" element={<AdminSearch />} />
            <Route path="/add-admin" element={<AddAdmin />} />
            <Route path="/manage-inventory" element={<ManageInventory />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
