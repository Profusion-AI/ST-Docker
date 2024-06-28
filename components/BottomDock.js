import React, { useCallback, memo } from 'react';
import Link from 'next/link';
import { Home, User, Book, Map, Settings } from 'lucide-react';

const DockButton = memo(({ href, icon, label }) => {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center">
        <div className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
          {icon}
        </div>
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  );
});

DockButton.displayName = 'DockButton';

const BottomDock = () => {
  const renderDockButton = useCallback((href, icon, label) => (
    <DockButton key={href} href={href} icon={icon} label={label} />
  ), []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 rounded-t-xl shadow-lg">
      <div className="flex justify-around items-center">
        {renderDockButton("/", <Home size={24} />, "Home")}
        {renderDockButton("/character", <User size={24} />, "Character")}
        {renderDockButton("/story", <Book size={24} />, "Story")}
        {renderDockButton("/manage", <Map size={24} />, "Manage")}
        {renderDockButton("/settings", <Settings size={24} />, "Settings")}
      </div>
    </div>
  );
};

export default memo(BottomDock);