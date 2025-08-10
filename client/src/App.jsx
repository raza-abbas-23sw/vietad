import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';
import { useLoading } from './hooks/useLoading';
import Home from './pages/Homepage/Home';
import ProductsPage from './pages/Productpages/ProductsPage';
import ProductDetailPage from './pages/Productpages/ProductDetailPage/ProductDetailPage';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Wishlist/Wishlist';
import './App.css';
import Cancel from './pages/Cancel';
import Success from './pages/success';

function App() {
  const isLoading = useLoading();

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col min-h-screen">
          <Toaster />
          <Navbar />
          <main className="flex-grow">
            {isLoading && <Loading />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:product" element={<ProductDetailPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;