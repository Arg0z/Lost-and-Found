import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Campus() {
  const { campusName } = useParams();

  const items = [
    { label: 'Chargers', count: 20, link: `/campus/${campusName}/chargers` },
    { label: 'Bottles', count: 5, link: `/campus/${campusName}/bottles` },
    { label: 'Wallets', count: 3, link: `/campus/${campusName}/wallets` },
    { label: 'Backpacks', count: 1, link: `/campus/${campusName}/backpacks` },
    { label: 'Hats', count: 4, link: `/campus/${campusName}/hats` },
    { label: 'Gloves', count: 6, link: `/campus/${campusName}/gloves`},
  ];

  return (
    <div>
      <h1>LOST AND FOUND</h1>
      <h2>{campusName} Campus</h2>
      <div className="items-container">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-placeholder">{item.label[0]}</div>
            <div>{item.label}</div>
            <div>{item.count}</div>
            {item.link && <Link to={item.link}>Details</Link>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campus;
