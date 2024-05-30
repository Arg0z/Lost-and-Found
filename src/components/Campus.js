import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Campus.css';

function Campus() {
  const { campusName } = useParams();

  const items = [
    { label: 'Chargers', count: 20, type: 'chargers' },
    { label: 'Bottles', count: 5, type: 'bottles' },
    { label: 'Wallets', count: 3, type: 'wallets' },
    { label: 'Backpacks', count: 1, type: 'backpacks' },
    { label: 'Hats', count: 4, type: 'hats' },
    { label: 'Gloves', count: 6, type: 'gloves' },
  ];

  return (
    <div className="campus-container">
      <h1>LOST AND FOUND</h1>
      <h2>{campusName} Campus</h2>
      <div className="items-container">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-placeholder">{item.label[0]}</div>
            <div>{item.label}</div>
            <div>{item.count}</div>
            <Link to={`/campus/${campusName}/${item.type}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campus;
