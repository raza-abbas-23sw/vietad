import { ChevronDown, ChevronUp } from 'lucide-react';

const DropdownBar = ({ title, isActive, link }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group hover:bg-white hover:shadow-sm">
      <span className={`font-medium transition-colors duration-200 ${
        isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
      }`}>
        {title}
      </span>
      {isActive ? (
        <ChevronUp className="w-4 h-4 text-gray-600 transition-transform duration-200" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:text-gray-500" />
      )}
    </div>
  );
};

export default DropdownBar;