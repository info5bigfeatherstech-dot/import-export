import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CareerPage from './pages/CareerPage'
import ContactPage from './pages/ContactPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-[#1F2937] antialiased selection:bg-[#0F9D7A] selection:text-white">
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
          {/* Fallback route to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
