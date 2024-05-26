import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Davis from './Davis';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Lost and Found</h1>
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
          <Route path="/davis" element={<Davis />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
