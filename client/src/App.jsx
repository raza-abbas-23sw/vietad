import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/Homepage/Home';
import ProductsPage from './pages/Productpages/ProductsPage'; 
import ProductDetailPage from './pages/Productpages/ProductDetailPage/ProductDetailPage';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:product" element={<ProductDetailPage />} />
  
  <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer/>
    </>
  );
}
export default App;