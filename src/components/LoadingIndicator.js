import React from 'react';
import './LoadingIndicator.css';

function LoadingIndicator({ isLoading }) {
  return isLoading ? <div className="loading-indicator">Loading...</div> : null;
}

export default LoadingIndicator;
