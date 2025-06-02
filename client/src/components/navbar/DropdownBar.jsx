// DropdownBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DropdownBar = ({ title, isActive, link }) => {
  return (
    <Link 
      to={link || '#'} 
      className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
        isActive 
          ? 'text-cyan-600'
          : 'text-gray-700 hover:text-cyan-600'
      }`}
    >
      {title}
    </Link>
  );
};

export default DropdownBar;