import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Campus.css';

function Campus() {
  const { campusName } = useParams();

  const campusInfo = {
    Davis: {
      address: '7899 McLaughlin Rd, Brampton, ON L6Y 5H9, Canada',
      items: [
        { label: 'Chargers', count: 20, link: `/campus/${campusName}/chargers` },
        { label: 'Bottles', count: 5, link: `/campus/${campusName}/bottles` },
        { label: 'Wallets', count: 3, link: `/campus/${campusName}/wallets` },
        { label: 'Backpacks', count: 1, link: `/campus/${campusName}/backpacks` },
        { label: 'Hats', count: 4, link: `/campus/${campusName}/hats` },
        { label: 'Gloves', count: 6, link: `/campus/${campusName}/gloves` },
      ],
    },
    HMC: {
      address: '4180 Duke of York Blvd, Mississauga, ON L5B 0G5, Canada',
      items: [
        { label: 'Chargers', count: 18, link: `/campus/${campusName}/chargers` },
        { label: 'Bottles', count: 4, link: `/campus/${campusName}/bottles` },
        { label: 'Wallets', count: 2, link: `/campus/${campusName}/wallets` },
        { label: 'Backpacks', count: 2, link: `/campus/${campusName}/backpacks` },
        { label: 'Hats', count: 3, link: `/campus/${campusName}/hats` },
        { label: 'Gloves', count: 5, link: `/campus/${campusName}/gloves` },
      ],
    },
    Trafalgar: {
      address: '1430 Trafalgar Rd, Oakville, ON L6H 2L1, Canada',
      items: [
        { label: 'Chargers', count: 22, link: `/campus/${campusName}/chargers` },
        { label: 'Bottles', count: 6, link: `/campus/${campusName}/bottles` },
        { label: 'Wallets', count: 4, link: `/campus/${campusName}/wallets` },
        { label: 'Backpacks', count: 3, link: `/campus/${campusName}/backpacks` },
        { label: 'Hats', count: 5, link: `/campus/${campusName}/hats` },
        { label: 'Gloves', count: 7, link: `/campus/${campusName}/gloves` },
      ],
    },
  };

  const campus = campusInfo[campusName];

  if (!campus) {
    return <div>Campus not found</div>;
  }

  return (
    <div className="campus-container">
      <h1>LOST AND FOUND</h1>
      <h2>{campusName} Campus</h2>
      <p>{campus.address}</p>
      <div className="items-container">
        {campus.items.map((item, index) => (
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
