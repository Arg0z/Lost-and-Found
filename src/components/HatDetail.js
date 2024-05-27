import React from 'react';
import { useParams } from 'react-router-dom';
import hatImage from './hats.png';

function HatDetail() {
  const { campusName } = useParams();

  return (
    <div className="detail-container">
      <h2>Hats</h2>
      <img src={hatImage} alt="Hat" className="detail-image" />
      <p>
        We currently have found 32 hats in {campusName} Campus. If you think that we have your charger,
        please, <a href="/contact">call us</a>, or <a href="/forms">apply online</a>.
      </p>
      <button onClick={() => window.location.href = '/contact'}>Call</button>
      <button onClick={() => window.location.href = '/forms'}>Online</button>
    </div>
  );
}

export default HatDetail;
