import React from 'react';
import { useParams } from 'react-router-dom';
import chargerImage from './chargers.png';
import bottleImage from './bottles.png';
import walletImage from './wallets.png';
import backpackImage from './backpacks.png';
import hatImage from './hats.png';
import glovesImage from './gloves.png';

const itemData = {
  chargers: { label: 'Chargers', image: chargerImage, description: 'We currently have found 32 chargers.' },
  bottles: { label: 'Bottles', image: bottleImage, description: 'We currently have found 5 bottles.' },
  wallets: { label: 'Wallets', image: walletImage, description: 'We currently have found 3 wallets.' },
  backpacks: { label: 'Backpacks', image: backpackImage, description: 'We currently have found 1 backpack.' },
  hats: { label: 'Hats', image: hatImage, description: 'We currently have found 4 hats.' },
  gloves: { label: 'Gloves', image: glovesImage, description: 'We currently have found 6 gloves.' }
};

function ItemDetail() {
  const { campusName, itemType } = useParams();
  const item = itemData[itemType];

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="detail-container">
      <h2>{item.label}</h2>
      <img src={item.image} alt={item.label} className="detail-image" />
      <p>
        {item.description} If you think that we have your {item.label.toLowerCase()},
        please, <a href="/contact">call us</a>, or <a href="/forms">apply online</a>.
      </p>
      <button onClick={() => window.location.href = '/contact'}>Call</button>
      <button onClick={() => window.location.href = '/forms'}>Online</button>
    </div>
  );
}

export default ItemDetail;
