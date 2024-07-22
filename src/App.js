import React, { useState, useEffect, useRef } from 'react';
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
import AddItem from './components/AddItem';
import ViewClaims from './components/ViewClaims';
import UserProfile from './components/UserProfile';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleDropdownClick = () => {
      if (dropdownRef.current) {
        dropdownRef.current.classList.toggle('show');
      }
    };

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        dropdownRef.current.classList.remove('show');
      }
    };

    const dropdownButton = dropdownButtonRef.current;
    if (dropdownButton) {
      dropdownButton.addEventListener('click', handleDropdownClick);
    }
    window.addEventListener('click', handleClickOutside);

    return () => {
      if (dropdownButton) {
        dropdownButton.removeEventListener('click', handleDropdownClick);
      }
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            {isAuthenticated && <Link to="/profile">Profile</Link>}
            {isAuthenticated && (
              <div className="dropdown" ref={dropdownRef}>
                <button className="dropbtn" ref={dropdownButtonRef}>Admin</button>
                <div className="dropdown-content">
                  <Link to="/admin-search">Admin Search</Link>
                  <Link to="/add-admin">Add Admin</Link>
                  <Link to="/manage-inventory">Manage Inventory</Link>
                  <Link to="/add-item">Add Item</Link>
                  <Link to="/view-claims">View Claims</Link>
                </div>
              </div>
            )}
            <div className="auth-links">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </div>
          </nav>
        </header>
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campus/:campusName" element={<Campus />} />
            <Route path="/campus/:campusName/:categoryName" element={<ItemDetail />} />
            <Route path="/forms" element={<ClaimForm />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin-search" element={<AdminSearch />} />
            <Route path="/add-admin" element={<AddAdmin />} />
            <Route path="/manage-inventory" element={<ManageInventory />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/view-claims" element={<ViewClaims />} />
            {isAuthenticated && <Route path="/profile" element={<UserProfile />} />}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
