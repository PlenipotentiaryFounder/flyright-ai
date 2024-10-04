import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_NAV_ITEMS } from '../../constants';

const PagesMenuBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex space-x-4">
      {MAIN_NAV_ITEMS.map((item, index) => (
        <Link
          key={index}
          to={`/${item.toLowerCase().replace(' ', '')}`}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            location.pathname === `/${item.toLowerCase().replace(' ', '')}` 
              ? "text-sky-600" 
              : "text-gray-700 hover:text-sky-600"
          }`}
        >
          {item}
        </Link>
      ))}
    </nav>
  );
};

export default PagesMenuBar;