import React from 'react';
import { useParams } from 'react-router-dom';
import chargerImage from './chargers.png';

function ChargerDetail() {
  const { campusName } = useParams();

  return (
    <div className="detail-container">
      <h2>Chargers</h2>
      <img src={chargerImage} alt="Charger" className="detail-image" />
      <p>
        We currently have found 32 chargers in {campusName} Campus. If you think that we have your charger,
        please, <a href="/contact">call us</a>, or <a href="/forms">apply online</a>.
      </p>
      <button onClick={() => window.location.href = '/contact'}>Call</button>
      <button onClick={() => window.location.href = '/forms'}>Online</button>
    </div>
  );
}

export default ChargerDetail;
