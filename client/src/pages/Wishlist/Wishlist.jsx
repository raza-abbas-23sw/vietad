import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success('Added to cart!');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist!');
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Wishlist cleared!');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-red-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-6">Add items to your wishlist to save them for later</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-cyan-500 text-white px-6 py-2.5 rounded-lg hover:bg-cyan-600 transition-colors font-medium"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-red-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">My Wishlist ({wishlist.length} items)</h1>
          <button
            onClick={handleClearWishlist}
            className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden p-2">
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 text-red-500"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-base text-gray-800">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs line-through text-gray-400">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-cyan-500 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <Link
                    to={`/products/${item.slug}`}
                    className="flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
