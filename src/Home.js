import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const locations = [
    { name: 'Davis', image: 'https://via.placeholder.com/200x150?text=Davis', link: '/davis' },
    { name: 'HMC', image: 'https://via.placeholder.com/200x150?text=HMC', link: '/' },
    { name: 'Trafalgar', image: 'https://via.placeholder.com/200x150?text=Trafalgar', link: '/' },
  ];

  return (
    <div>
      <h1>LOST AND FOUND</h1>
      <div className="locations-container">
        {locations.map((location, index) => (
          <div className="location" key={index}>
            <Link to={location.link}>
              <img src={location.image} alt={location.name} />
              <div>{location.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
