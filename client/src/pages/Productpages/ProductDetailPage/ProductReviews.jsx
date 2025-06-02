import React from 'react';

const ProductReviews = ({ reviews, rating }) => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
          </div>
          <span className="text-xl font-bold">{rating} out of 5</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-8">
          {reviews.map((review, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-800">{review.customerName}</h4>
                  <span className="text-sm text-gray-500">Verified Buyer</span>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow transition duration-300">
          Write a Review
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
