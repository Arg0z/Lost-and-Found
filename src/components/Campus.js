import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Campus.css';

function Campus() {
  const { campusName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7224/api/items/location/${campusName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch items', error);
        setError(error);
        setLoading(false);
      });
  }, [campusName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
            <img src={item.photo_url} alt={item.description} className="item-image" />
            <div className="item-details">
              <div>{item.category}</div>
              <div>{item.description}</div>
              <Link to={`/campus/${campusName}/${item.category}`}>Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campus;
