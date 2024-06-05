import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemDetail.css';

function ItemDetail() {
  const { campusName, categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7224/api/items/location/${campusName}/category/${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [campusName, categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!items.length) {
    return <div>No items found for this category</div>;
  }

  return (
    <div className="item-detail-container">
      <h1>LOST AND FOUND</h1>
      <h2>{categoryName} in {campusName} Campus</h2>
      <div className="items-container">
        {items.map(item => (
          <div key={item.item_id} className="item-detail">
            <div><strong>Category:</strong> {item.category}</div>
            <div><strong>Description:</strong> {item.description}</div>
            <div><strong>Location Found:</strong> {item.location_found}</div>
            <div><strong>Date Found:</strong> {new Date(item.date_found).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
      <div className="contact-message">
        If you think we have your charger, please <a href="tel:your-phone-number">call us</a>, or <Link to="/forms">apply online</Link>.
      </div>
    </div>
  );
}

export default ItemDetail;
