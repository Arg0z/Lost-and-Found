import React from 'react';
import { Link } from 'react-router-dom';

function Davis() {
  const items = [
    { label: 'Chargers', count: 21, link: '/chargers' },
    { label: 'Bottles', count: 5 },
    { label: 'Wallets', count: 3 },
    { label: 'Backpacks', count: 1 },
    { label: 'Hats', count: 4 },
    { label: 'Gloves', count: 6 },
  ];

  return (
    <div>
      <h1>LOST AND FOUND</h1>
      <h2>Davis</h2>
      <div className="items-container">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-placeholder">{item.label[0]}</div>
            <div>
              <Link to={item.link || '#'}>{item.label}</Link>
            </div>
            <div>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Davis;
