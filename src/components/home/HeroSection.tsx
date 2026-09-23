import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbArrowUpRight,
  TbArrowDown,
} from 'react-icons/tb'
import { WordRotate } from '../ui/word-rotate'

interface Slide {
  id: number
  image: string
  alt: string
  tag: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80',
    alt: 'ShivaSun Moderno high-fashion editorial collection',
    tag: 'New Season • Modern Silhouette & Style',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80',
    alt: 'Luxury boutique fashion and contemporary apparel curation',
    tag: 'Bespoke Craftsmanship • Everyday Essentials',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80',
    alt: 'Designer apparel and premium outerwear lines',
    tag: 'Men, Women & Unisex • Bold Statement Pieces',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Autoplay background slides smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative w-full min-h-[640px] lg:h-screen lg:max-h-[980px] lg:min-h-[720px] flex items-center justify-between bg-[#07162A] overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Background Slides with Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Film Vignette & Moody Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#07162A]/95 via-[#07162A]/75 to-[#07162A]/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#07162A] via-transparent to-[#07162A]/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 world-map-pattern opacity-10 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          {/* Eyebrow Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 mb-4"
          >
            {/* <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-sm shadow-amber-400/50 animate-pulse" /> */}
            <p className="text-xs font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 uppercase font-[Manrope]">
              SHIVASUN MODERNO APPAREL
            </p>
          </motion.div>

          {/* Headline matching user request */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black uppercase tracking-tight leading-[1.08] text-white mb-6 font-[Manrope]"
          >
            <span className="block text-slate-200 text-lg sm:text-2xl md:text-3xl font-bold tracking-normal normal-case mb-1 font-[Manrope]">
              Welcome to
            </span>
            <span className="block text-white drop-shadow-md">
              SHIVASUN{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                MODERNO
              </span>
            </span>
            <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-slate-100 normal-case font-[Manrope]">
              Where Style Meets{' '}
              <span className="inline-block">
                <WordRotate
                  words={['Comfort', 'Confidence', 'Elegance', 'Everyday Luxury']}
                  duration={2600}
                  className="text-stroke-white text-white font-black"
                />
              </span>
            </span>
          </motion.h1>

          {/* Description Paragraph matching user request */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-[Inter] capitalize"
          >
            Discover fashion that speaks your vibe! At ShivaSun Moderno, we bring you
            the latest trends in men’s, women’s, and unisex fashion—from everyday
            essentials to bold statement pieces.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {/* Primary Action Button: Shop Now */}
            <a
              href="#products"
              id="hero-shop-now"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-extrabold text-base sm:text-lg rounded-xl shadow-2xl shadow-amber-500/25 transition-all duration-200 group hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Shop Now</span>
              <TbArrowUpRight
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                size={20}
              />
            </a>

            {/* Underlined Secondary Navigation Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base font-semibold text-white">
              <a
                href="#products"
                id="hero-categories-link"
                className="underline underline-offset-4 decoration-white/70 hover:decoration-amber-400 hover:text-amber-300 transition-colors"
              >
                Explore Categories
              </a>

              <a
                href="#gallery"
                id="hero-gallery-link"
                className="underline underline-offset-4 decoration-white/70 hover:decoration-amber-400 hover:text-amber-300 transition-colors"
              >
                Inside Factories
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical EXPLORE Indicator on the Bottom-Right (matching reference) */}
      <a
        href="#products"
        aria-label="Scroll down to explore"
        className="absolute bottom-8 right-6 lg:right-10 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group cursor-pointer"
      >
        <span
          className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/80 group-hover:text-white"
          style={{ writingMode: 'vertical-rl' }}
        >
          EXPLORE
        </span>
        <TbArrowDown
          size={16}
          className="animate-bounce text-amber-400 mt-1"
        />
      </a>
    </section>
  )
}
