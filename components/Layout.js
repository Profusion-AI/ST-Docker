import React, { memo } from 'react';
import BottomDock from './BottomDock';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen pb-20">
      {children}
      <BottomDock />
    </div>
  );
};

export default memo(Layout);