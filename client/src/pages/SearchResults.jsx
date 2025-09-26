// pages/SearchResults.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productsData, templates } from '../assets/allData/productPageData/productsData.js';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  if (!query) {
    return <div>No search query provided</div>;
  }

  const lowerQuery = query.toLowerCase();
  
  const productResults = productsData.filter(product => 
    product.title.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );

  const templateResults = templates.filter(template =>
    template.title.toLowerCase().includes(lowerQuery) ||
    template.category.toLowerCase().includes(lowerQuery)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      
      {productResults.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Products ({productResults.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productResults.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.slug}`}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <img src={product.img} alt={product.title} className="w-full h-48 object-cover rounded" />
                <h3 className="font-semibold mt-2">{product.title}</h3>
                <p className="text-cyan-600 font-bold">${product.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {templateResults.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Templates ({templateResults.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateResults.map(template => (
              <Link 
                key={template.id} 
                to={`/design-tool?template=${template.id}`}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <img src={template.img} alt={template.title} className="w-full h-48 object-cover rounded" />
                <h3 className="font-semibold mt-2">{template.title}</h3>
                <p className="text-gray-600 capitalize">{template.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {productResults.length === 0 && templateResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No results found for "{query}"</p>
          <p className="text-gray-500">Try different keywords or browse our categories</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;