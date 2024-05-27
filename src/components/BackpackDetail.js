import React from 'react';
import { useParams } from 'react-router-dom';
import backpackImage from './backpacks.png';

function BackpackDetail() {
  const { campusName } = useParams();

  return (
    <div className="detail-container">
      <h2>Backpacks</h2>
      <img src={backpackImage} alt="Backpack" className="detail-image" />
      <p>
        We currently have found 32 backpacks in {campusName} Campus. If you think that we have your charger,
        please, <a href="/contact">call us</a>, or <a href="/forms">apply online</a>.
      </p>
      <button onClick={() => window.location.href = '/contact'}>Call</button>
      <button onClick={() => window.location.href = '/forms'}>Online</button>
    </div>
  );
}

export default BackpackDetail;
