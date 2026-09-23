import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-[#1F2937] antialiased selection:bg-[#0F9D7A] selection:text-white">
      <Navbar />
      <main className="w-full flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Fallback route to home for demo navigation */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
