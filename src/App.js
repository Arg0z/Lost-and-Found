import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Campus from './components/Campus';
import ItemDetail from './components/ItemDetail';
import ClaimForm from './components/ClaimForm';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>SHERIDAN</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/forms">Forms</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <div className="auth-links">
              <a href="/login">Login</a>
              <a href="/signup">Sign Up</a>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campus/:campusName" element={<Campus />} />
          <Route path="/campus/:campusName/:itemType" element={<ItemDetail />} />
          <Route path="/forms" element={<ClaimForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
