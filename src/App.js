import React from 'react';
import './App.css';

function App() {
  const locations = [
    { name: 'Davis', image: 'https://via.placeholder.com/200x150?text=Davis' },
    { name: 'HMC', image: 'https://via.placeholder.com/200x150?text=HMC' },
    { name: 'Trafalgar', image: 'https://via.placeholder.com/200x150?text=Trafalgar' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <a href="#">HOME</a>
          <a href="#">FORMS</a>
          <a href="#">ABOUT</a>
          <a href="#">CONTACT</a>
          <div className="auth-links">
            <a href="#">Login</a>
            <a href="#">Sign Up</a>
          </div>
        </nav>
        <h1>LOST AND FOUND</h1>
        <div className="locations-container">
          {locations.map((location, index) => (
            <div className="location" key={index}>
              <img src={location.image} alt={location.name} />
              <div>{location.name}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

