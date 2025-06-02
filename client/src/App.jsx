import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Homepage/Home';
import ProductsPage from './pages/Productpages/ProductsPage';
import ProductDetailPage from './pages/Productpages/ProductDetailPage/ProductDetailPage';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:product" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;