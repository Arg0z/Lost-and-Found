// ChargerDetail.js
import React from 'react';
import chargerImage from './chargers.png'; 

function ChargerDetail() {
  return (
    <div className="detail-container">
      <h1>LOST AND FOUND</h1>
      <h2>Chargers</h2>
      <img src={chargerImage} alt="Charger" className="detail-image" />
      <p>
        We currently have found 21 chargers in Davis Campus. If you think that we have your charger,
        please, <a href="tel:your-phone-number">call us</a>, or <a href="your-online-form-link">apply online</a>.
      </p>
      <button onClick={() => window.location.href = 'tel:your-phone-number'}>Call</button>
      <button onClick={() => window.location.href = 'your-online-form-link'}>Online</button>
    </div>
  );
}

export default ChargerDetail;
