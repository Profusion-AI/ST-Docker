'use client';

import React from 'react';

const Tracey = ({ message }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg mb-4">
      <p className="font-bold mb-2">Tracey:</p>
      <p>{message}</p>
    </div>
  );
};

export default Tracey;