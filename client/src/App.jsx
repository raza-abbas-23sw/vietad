import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/Productpages/ProductsPage'; 
import CategoryPage from './pages/Productpages/CategoryPage';
import ProductDetailPage from './pages/Productpages/ProductDetailPage';
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