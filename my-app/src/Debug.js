import React from 'react';

const Debug = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
      <h3>Debug Information</h3>
      <p><strong>REACT_APP_API_URL:</strong> {process.env.REACT_APP_API_URL || 'NOT SET'}</p>
      <p><strong>Base URL:</strong> {process.env.REACT_APP_API_URL || 'http://localhost:5500'}</p>
      <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
    </div>
  );
};

export default Debug;
