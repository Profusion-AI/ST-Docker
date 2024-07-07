import React from 'react';
import BottomDock from './BottomDock';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <BottomDock />
    </div>
  );
};

export default Layout;