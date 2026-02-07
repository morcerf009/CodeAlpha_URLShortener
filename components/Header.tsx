
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-200">
            <i className="fas fa-bolt text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            LinkSwift
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
