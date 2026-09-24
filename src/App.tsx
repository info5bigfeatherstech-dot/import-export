import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CareerPage from './pages/CareerPage'
import ContactPage from './pages/ContactPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-[#1F2937] antialiased selection:bg-amber-400 selection:text-slate-950">
      <ScrollToTop />
      <Navbar />
      <main className="w-full flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/services" element={<ServiceDetailPage />} />
          <Route path="/products/:categorySlug" element={<ProductCategoryPage />} />
          <Route path="/products" element={<ProductCategoryPage />} />
          <Route path="/mens-jacket" element={<ProductCategoryPage />} />
          <Route path="/womens-jacket" element={<ProductCategoryPage />} />
          <Route path="/kids-jackets" element={<ProductCategoryPage />} />
          <Route path="/industry/:categoryId" element={<CategoryDetailPage />} />
          <Route path="/industry" element={<CategoryDetailPage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
          <Route path="/categories" element={<CategoryDetailPage />} />
          <Route path="/garments" element={<CategoryDetailPage />} />
          <Route path="/footwears" element={<CategoryDetailPage />} />
          <Route path="/fabric" element={<CategoryDetailPage />} />
          <Route path="/garment-fabric" element={<CategoryDetailPage />} />
          <Route path="/home-textile-fabric" element={<CategoryDetailPage />} />
          <Route path="/home-textile" element={<CategoryDetailPage />} />
          <Route path="/bags-wallets" element={<CategoryDetailPage />} />
          <Route path="/jewellery-accessories" element={<CategoryDetailPage />} />
          <Route path="/tailoring-accessories" element={<CategoryDetailPage />} />
          <Route path="/electronic-appliances" element={<CategoryDetailPage />} />
          <Route path="/mix-items" element={<CategoryDetailPage />} />
          <Route path="/spare-parts" element={<CategoryDetailPage />} />
          {/* Fallback route to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
