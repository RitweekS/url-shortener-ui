import React from 'react';
import { Link } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-200 dark:border-gray-700 animate-slide-in-down">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 hover-lift">
          <Link size={24} className="text-purple-600 dark:text-purple-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">LinkSnip</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;