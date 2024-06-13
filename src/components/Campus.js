import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Campus.css';

const imageMap = {
  "Laptop": "/images/generic_laptop.jpg",
  "Water Bottle": "/images/generic_water_bottle.jpg",
  "Wallet": "/images/generic_wallet.jpg",
  "string": "/images/generic_item.jpg",
};

function Campus() {
  const { campusName } = useParams();
  const [items, setItems] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch(`https://cors-anywhere.herokuapp.com/http://lostandfoundback-dev.eba-ihrrezy2.us-east-1.elasticbeanstalk.com/api/items/location/${campusName}`);
        console.log('itemsResponse:', itemsResponse);
        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch items');
        }
        const itemsData = await itemsResponse.json();

        const countsResponse = await fetch(`https://cors-anywhere.herokuapp.com/http://lostandfoundback-dev.eba-ihrrezy2.us-east-1.elasticbeanstalk.com/api/items/location/${campusName}/count-by-category`);
        console.log('countsResponse:', countsResponse);
        if (!countsResponse.ok) {
          throw new Error('Failed to fetch category counts');
        }
        const countsData = await countsResponse.json();

        setItems(itemsData);
        setCategoryCounts(countsData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
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
        {Array.isArray(categoryCounts) && categoryCounts.length > 0 ? (
          categoryCounts.map((categoryCount, index) => (
            <div className="item" key={index}>
              <img src={imageMap[categoryCount.category] || "/images/generic_item.jpg"} alt={categoryCount.category} className="item-placeholder" />
              <div>{categoryCount.category}</div>
              <div>{categoryCount.count}</div>
              {categoryCount.category && (
                <Link to={`/campus/${campusName}/${categoryCount.category.toLowerCase()}`}>Details</Link>
              )}
            </div>
          ))
        ) : (
          <div>No categories found</div>
        )}
      </div>
    </div>
  );
}

export default Campus;
