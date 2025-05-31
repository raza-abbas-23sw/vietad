// DropdownBar.jsx
const DropdownBar = ({ title, isOpen }) => {
  return (
    <button
      className={`px-4 py-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all ${
        isOpen 
          ? 'bg-blue-600 text-white shadow-inner' 
          : 'bg-gray-50 hover:bg-gray-100 text-gray-800 hover:shadow-sm'
      }`}
    >
      {title}
    </button>
  );
};

export default DropdownBar;