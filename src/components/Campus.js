import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Campus.css';

function Campus() {
  const { campusName } = useParams();
  const [items, setItems] = useState([]);

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
            <Link to={`/campus/${campusName}/${item.category}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campus;
