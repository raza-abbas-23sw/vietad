import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist!');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-gray-600'
              }`}
            />
          </button>
        </div>
        <div className="p-3">
          <div className="flex gap-1.5 mb-2">
            {product.tags && product.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-1.5 py-0.5 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-sm font-semibold mb-1 line-clamp-1 text-gray-800">{product.title}</h3>
          <p className="text-xs mb-2 line-clamp-2 text-gray-600">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-gray-800">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs line-through text-gray-400">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-1.5 bg-cyan-500 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 