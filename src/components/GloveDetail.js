import React from 'react';
import { useParams } from 'react-router-dom';
import gloveImage from './gloves.png';

function GloveDetail() {
  const { campusName } = useParams();
  const [gloveCount, setGloveCount] = React.useState(32); // You can fetch this or set it dynamically

  return (
    <div className="detail-container">
      <h2>Gloves</h2>
      <img src={gloveImage} alt="Glove" className="detail-image" />
      <p>
        We currently have found {gloveCount} gloves in {campusName} Campus. If you think that we have your gloves,
        please, <a href="/contact">call us</a>, or <a href="/forms">apply online</a>.
      </p>
      <button onClick={() => window.location.href = '/contact'}>Call</button>
      <button onClick={() => window.location.href = '/forms'}>Online</button>
    </div>
  );
}

export default GloveDetail;
