import React from 'react';

const StoryError = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-xl font-bold text-red-500 mb-4">Oops! Something went wrong</p>
      <p className="text-lg mb-4">{message}</p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
};

export default StoryError;