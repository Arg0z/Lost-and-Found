import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Campus.css';

function Campus() {
  const { campusName } = useParams();
  const [items, setItems] = useState([]);

<<<<<<< HEAD
  const items = [
    { label: 'Chargers', count: 20, type: 'chargers' },
    { label: 'Bottles', count: 5, type: 'bottles' },
    { label: 'Wallets', count: 3, type: 'wallets' },
    { label: 'Backpacks', count: 1, type: 'backpacks' },
    { label: 'Hats', count: 4, type: 'hats' },
    { label: 'Gloves', count: 6, type: 'gloves' },
  ];
=======
  useEffect(() => {
    fetch(`https://localhost:7224/api/items/location/${campusName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('Failed to fetch items', error));
  }, [campusName]);

  if (!items.length) {
    return <div>No items found for this campus</div>;
  }
>>>>>>> 15c1fc4f98cb77dc111f239bcaf534b8b5924d61

  return (
    <div className="campus-container">
      <h1>LOST AND FOUND</h1>
      <h2>{campusName} Campus</h2>
      <div className="items-container">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-placeholder">{item.category[0]}</div>
            <div>{item.category}</div>
            <div>{item.count}</div>
<<<<<<< HEAD
            <Link to={`/campus/${campusName}/${item.type}`}>Details</Link>
=======
            <Link to={`/campus/${campusName}/${item.category}`}>Details</Link>
>>>>>>> 15c1fc4f98cb77dc111f239bcaf534b8b5924d61
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campus;
