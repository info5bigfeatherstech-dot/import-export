import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TbX, TbZoomIn, TbChevronLeft, TbChevronRight } from 'react-icons/tb'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Modern Factory & Logistics Complex',
    category: 'Facilities',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Manufacturing Campus Entrance',
    category: 'Facilities',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Industrial Park & Supply Grounds',
    category: 'Facilities',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Company Anniversary & Honors Ceremony',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Annual Team Milestone Celebration',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Staff Summer Retreat & Team Building',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Automated CNC Multi-Head Embroidery Unit',
    category: 'Machinery',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Precision Fabric Spreading & Laser Cutter',
    category: 'Machinery',
    image: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Industrial Steam Finishing & Pressing',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'High-Precision Seam Lockstitch Operator',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    title: 'Final Quality Inspection & Measurement Bench',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 12,
    title: 'High-Volume Garment Sewing Assembly Floor',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
  },
]

export default function FactoryGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + galleryItems.length) % galleryItems.length)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % galleryItems.length)
    }
  }

  return (
    <section
      id="gallery"
      aria-label="Inside Our Factories Gallery"
      className="w-full bg-[#FCFDFD] py-20 lg:py-28 border-t border-slate-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          {/* Eyebrow with horizontal accent bar */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-xs font-extrabold tracking-[0.22em] text-amber-600 uppercase font-[Manrope]">
              INSIDE OUR FACTORIES
            </span>
            <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] font-[Manrope] tracking-tight">
            Gallery
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm sm:text-base font-[Inter] mt-2 max-w-2xl capitalize">
            A look inside our production floors and finished products.
          </p>
        </div>

        {/* 4-Column Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              onClick={() => setActiveImageIndex(index)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                <span className="inline-block self-start text-[10px] font-bold text-slate-950 uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-400 px-2.5 py-0.5 rounded-full mb-1.5 font-[Manrope] shadow-sm">
                  {item.category}
                </span>
                <p className="text-white text-xs sm:text-sm font-semibold font-[Manrope] leading-snug line-clamp-2">
                  {item.title}
                </p>

                {/* Zoom Icon Pill */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TbZoomIn size={16} className="text-amber-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              aria-label="Close image preview"
            >
              <TbX size={22} />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              aria-label="Previous image"
            >
              <TbChevronLeft size={24} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              aria-label="Next image"
            >
              <TbChevronRight size={24} />
            </button>

            {/* Image & Caption Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={galleryItems[activeImageIndex].image}
                alt={galleryItems[activeImageIndex].title}
                className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full font-[Manrope]">
                  {galleryItems[activeImageIndex].category}
                </span>
                <p className="text-white text-base sm:text-lg font-bold font-[Manrope] mt-2">
                  {galleryItems[activeImageIndex].title}
                </p>
                <p className="text-slate-400 text-xs font-[Inter] mt-1">
                  Photo {activeImageIndex + 1} of {galleryItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
