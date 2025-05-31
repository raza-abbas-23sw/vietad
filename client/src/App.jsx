import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'; 
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:category" element={<CategoryPage />} />
        <Route path="/products/:category/:product" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}

export default App;