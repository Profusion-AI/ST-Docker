import React from 'react';

const StoryLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-lg font-semibold">Tracey is crafting your adventure...</p>
      <div className="mt-2 text-sm text-gray-500">This may take a moment as the story unfolds</div>
    </div>
  );
};

export default StoryLoading;