import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Mock Orals', path: '/admin/mock-orals' },
    { name: 'Gouges', path: '/admin/gouges' },
    { name: 'Flashcards', path: '/admin/flashcards' },
    { name: 'Analytics', path: '/admin/analytics' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className="block p-2 hover:bg-gray-700 rounded transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;