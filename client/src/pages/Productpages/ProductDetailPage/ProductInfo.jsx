import React, { useState } from 'react';
import { CheckCircle, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { toast } from 'react-hot-toast';
import '../Product.css'; // Import the new CSS file

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || { width: 12, height: 12 });
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0] || { id: 'standard', name: 'Standard' });
  const [selectedFrame, setSelectedFrame] = useState(product.frameOptions?.[0] || 'Standard');
  // Placeholder states for additional options based on the image
  const [selectedThickness, setSelectedThickness] = useState('0.040"');
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedShape, setSelectedShape] = useState('Square / Rectangle Cut');
  const [selectedPrintSides, setSelectedPrintSides] = useState('Single-Sided Print');
  const [selectedDrilledHoles, setSelectedDrilledHoles] = useState('None');

  const [unit, setUnit] = useState('inch');

  const incrementQuantity = () => {
    if (quantity < product.availableStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      price: Number(product.price) || 0,
      quantity: Number(quantity) || 0,
      selectedSize,
      selectedMaterial,
      selectedFrame,
      selectedThickness,
      selectedColor,
      selectedShape,
      selectedPrintSides,
      selectedDrilledHoles,
    };
    addToCart(cartItem);
    toast.success('Item added to cart!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  };

  // Placeholder options - replace with actual data fetching/props if available
  const thicknessOptions = ['0.040"', '0.080"', '0.125"'];
  const colorOptions = ['White', 'Black', 'Red', 'Blue'];
  const shapeOptions = ['Square / Rectangle Cut', 'Circle Cut', 'Custom Shape'];
  const printSidesOptions = ['Single-Sided Print', 'Double-Sided Print'];
  const drilledHolesOptions = ['None', 'Top Left & Right', 'All Four Corners'];

  return (
    <div className="space-y-6">
      {product.tags && product.tags.length > 0 && (
        <div className="mb-2">
          {product.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
        <span className="text-gray-600">({product.ratingCount || 0} reviews)</span>
      </div>
      
      {/* Price section - moved below title and reviews */}
      <div className="mb-6">
        <span className="text-2xl font-bold text-gray-800">${(product.price * quantity).toFixed(2)}</span>
        {product.originalPrice && (
          <span className="ml-2 text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>
      
      <p className="text-gray-600 mb-8">{product.description}</p>
      
      {/* Options Section */}
      <div className="bg-gray-100 p-6 rounded-lg space-y-6">
        {/* Size Selection with Unit Toggle */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Size</h3>
            <button className="text-sm text-cyan-600 hover:underline">Set Custom Size</button>
          </div>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={`${selectedSize.width}x${selectedSize.height}`}
            onChange={(e) => {
              const [width, height] = e.target.value.split('x').map(Number);
              setSelectedSize({ width, height });
            }}
          >
            {(product.sizes && product.sizes.length > 0 ? product.sizes : [{ width: 12, height: 12 }]).map((size, index) => (
              <option key={index} value={`${size.width}x${size.height}`}>
                {size.width} × {size.height} {unit}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-4 mt-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-cyan-600"
                name="unit"
                value="inch"
                checked={unit === 'inch'}
                onChange={() => setUnit('inch')}
              />
              <span className="ml-2 text-sm text-gray-700">Inch</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-cyan-600"
                name="unit"
                value="feet"
                checked={unit === 'feet'}
                onChange={() => setUnit('feet')}
              />
              <span className="ml-2 text-sm text-gray-700">Feet</span>
            </label>
          </div>
        </div>

        {/* Material Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Material</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedMaterial.id}
            onChange={(e) => {
              const material = (product.materials || []).find(m => m.id === e.target.value);
              if (material) setSelectedMaterial(material);
            }}
          >
            {(product.materials && product.materials.length > 0 ? product.materials : [{ id: 'standard', name: 'Standard Aluminum' }]).map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>

        {/* Thickness Selection - Placeholder */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Thickness</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedThickness}
            onChange={(e) => setSelectedThickness(e.target.value)}
          >
            {thicknessOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Color Selection - Placeholder */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Color</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colorOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Shape Selection - Placeholder */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Shape</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedShape}
            onChange={(e) => setSelectedShape(e.target.value)}
          >
            {shapeOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Print Sides Selection - Placeholder */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Print Sides</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedPrintSides}
            onChange={(e) => setSelectedPrintSides(e.target.value)}
          >
            {printSidesOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Drilled Holes Selection - Placeholder */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Drilled Holes</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedDrilledHoles}
            onChange={(e) => setSelectedDrilledHoles(e.target.value)}
          >
            {drilledHolesOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Frame Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Frame</h3>
          <select 
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={selectedFrame}
            onChange={(e) => setSelectedFrame(e.target.value)}
          >
            {(product.frameOptions || ['Standard']).map((frame, index) => (
              <option key={index} value={frame}>
                {frame}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex flex-col gap-4 mt-8 mb-8">
        <div className="flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button 
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
              onClick={decrementQuantity}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-gray-800">{quantity}</span>
            <button 
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
              onClick={incrementQuantity}
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price Display */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">${product.price.toFixed(2)} each</span>
              <span className="text-lg font-bold text-gray-800">${(product.price * quantity).toFixed(2)} total</span>
            </div>
            <button className="text-sm text-cyan-600 hover:underline mt-1">Buy more, save more</button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-md transition duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
      
      {/* Design Upload Button */}
      <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 mb-4">
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9"/><path d="m8 16 4-4 4 4"/></svg>
          Upload design
        </div>
        <div className="text-xs font-normal mt-1">Use high resolution files for fine quality</div>
      </button>
      
      {/* Design Online Button */}
      <button className="w-full bg-white border border-gray-300 text-gray-800 font-bold py-3 px-6 rounded-md transition duration-300 mb-6">
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-template"><rect width="7" height="5" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="5" x="14" y="16" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          Design online
        </div>
        <div className="text-xs font-normal mt-1">or choose one of our templates</div>
      </button>
      
      {/* Product Meta */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="font-medium mr-2">Category:</span>
          <span>{product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Availability:</span>
          <span className="text-green-600">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
