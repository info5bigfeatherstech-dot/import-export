import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbCircleDot,
  TbSquare,
  TbBuildingStore,
} from 'react-icons/tb'
import { HiArrowRight } from 'react-icons/hi'
import { exportCategories } from '../../data/categories'

type ShapeMode = 'circular' | 'arch' | 'square'

export default function ExportCategories() {
  const [shapeMode, setShapeMode] = useState<ShapeMode>('circular')

  return (
    <section
      id="products"
      aria-labelledby="categories-heading"
      className="w-full py-20 lg:py-28 bg-[#FCFDFD] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#0F9D7A]/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="w-8 h-[2px] bg-[#0F9D7A]" />
            <p className="text-xs font-bold tracking-[0.25em] text-[#0F9D7A] uppercase font-[Manrope]">
              Core Trading Sectors
            </p>
            <span className="w-8 h-[2px] bg-[#0F9D7A]" />
          </motion.div>

          <motion.h2
            id="categories-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-4 font-[Manrope]"
          >
            Our Export Categories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-[Inter]"
          >
            We operate dedicated commodity desks across six key global trade sectors, ensuring verified supplier origin, laboratory certification, and multimodal shipping.
          </motion.p>
        </div>

        {/* Interactive Shape Viewport Switcher */}
        <div className="flex items-center justify-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100 border border-slate-200/90 shadow-inner">
            <button
              onClick={() => setShapeMode('circular')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                shapeMode === 'circular'
                  ? 'bg-white text-[#0B1F3A] shadow-md shadow-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <TbCircleDot
                size={16}
                className={shapeMode === 'circular' ? 'text-[#0F9D7A]' : ''}
              />
              <span>Circular Portals</span>
            </button>

            <button
              onClick={() => setShapeMode('arch')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                shapeMode === 'arch'
                  ? 'bg-white text-[#0B1F3A] shadow-md shadow-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <TbBuildingStore
                size={16}
                className={shapeMode === 'arch' ? 'text-[#0F9D7A]' : ''}
              />
              <span>Arched Heritage</span>
            </button>

            <button
              onClick={() => setShapeMode('square')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                shapeMode === 'square'
                  ? 'bg-white text-[#0B1F3A] shadow-md shadow-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <TbSquare
                size={16}
                className={shapeMode === 'square' ? 'text-[#0F9D7A]' : ''}
              />
              <span>Square Bento</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={shapeMode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 sm:gap-8"
          >
            {exportCategories.map((cat, i) => {
              const Icon = cat.icon

              // 1. CIRCULAR PORTALS MODE (Iconic circular photo lenses with rotating orbit rings)
              if (shapeMode === 'circular') {
                return (
                  <motion.article
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
                    className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#0F9D7A]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Radial Ambient Glow */}
                    <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#0F9D7A]/10 rounded-full blur-2xl group-hover:bg-[#0F9D7A]/20 transition-all duration-500" />

                    {/* Top Meta: Number & Sector Badge */}
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <span className="text-[11px] font-extrabold tracking-widest text-[#0F9D7A] uppercase font-[Manrope]">
                        SECTOR {cat.number}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-full">
                        GLOBAL TRADE
                      </span>
                    </div>

                    {/* Prominent Circular Lens with Orbit Ring */}
                    <div className="relative z-10 mx-auto my-3 w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
                      {/* Decorative Dashed Orbit Ring */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#0F9D7A]/30 group-hover:border-[#0F9D7A] group-hover:rotate-90 transition-all duration-700 pointer-events-none" />

                      {/* Circular Image Aperture */}
                      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-xl border-4 border-white ring-4 ring-slate-100 group-hover:ring-[#0F9D7A]/30 transition-all duration-500 relative">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                      </div>

                      {/* Circular Floating Sector Icon Badge */}
                      <div className="absolute bottom-1 right-2 w-10 h-10 rounded-full bg-[#0F9D7A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#0B1F3A] transition-all duration-300">
                        <Icon size={20} />
                      </div>
                    </div>

                    {/* Text Body */}
                    <div className="relative z-10 text-center mt-3">
                      <h3 className="text-xl font-bold text-[#0B1F3A] font-[Manrope] mb-1.5 group-hover:text-[#0F9D7A] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#0F9D7A] uppercase tracking-wider mb-3 font-[Manrope]">
                        {cat.subtitle}
                      </p>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5 line-clamp-3 font-[Inter]">
                        {cat.description}
                      </p>

                      {/* Pill Tags */}
                      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                        {cat.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-emerald-50/80 group-hover:text-[#0B7A5E] text-slate-700 text-[11px] font-medium border border-slate-200/60 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-center">
                      <a
                        href="#contact"
                        id={`category-circular-${cat.id}`}
                        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0F9D7A] hover:text-[#0B1F3A] transition-colors group/link"
                      >
                        <span>Request Sourcing Spec</span>
                        <HiArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </motion.article>
                )
              }

              // 2. ARCHED HERITAGE MODE (Roman Arched Top Gallery Silhouette)
              if (shapeMode === 'arch') {
                return (
                  <motion.article
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
                    className="group bg-white rounded-t-[100px] rounded-b-3xl p-6 pt-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#0F9D7A]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                  >
                    <div>
                      {/* Arched Architectural Window */}
                      <div className="relative w-full aspect-[4/3] rounded-t-[80px] rounded-b-2xl overflow-hidden bg-slate-100 shadow-md mb-6 border border-slate-200/60">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Bottom Arch Tag */}
                        <div className="absolute bottom-3 left-4 right-4 text-center">
                          <span className="text-[11px] font-bold text-white tracking-widest uppercase drop-shadow-md">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <span className="text-[11px] font-extrabold tracking-widest text-[#0F9D7A] uppercase font-[Manrope] block mb-1">
                          ARCH {cat.number}
                        </span>
                        <h3 className="text-xl font-bold text-[#0B1F3A] font-[Manrope] mb-2 group-hover:text-[#0F9D7A] transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4 line-clamp-3 font-[Inter]">
                          {cat.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                          {cat.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-center">
                      <a
                        href="#contact"
                        id={`category-arch-${cat.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F9D7A] hover:text-[#0B1F3A] transition-colors group/link"
                      >
                        <span>Explore Industry Line</span>
                        <HiArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </motion.article>
                )
              }

              // 3. SQUARE BENTO MODE (Minimal, High-Impact Square Geometry)
              return (
                <motion.article
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.08 }}
                  className="group relative bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#0F9D7A]/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    {/* Square Image Box */}
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md mb-5 group-hover:shadow-lg transition-shadow">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                      {/* Top Corner Number Badge */}
                      <span className="absolute top-3 right-3 text-[11px] font-bold tracking-widest text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
                        {cat.number}
                      </span>

                      {/* In-Image Caption */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-base font-bold font-[Manrope] drop-shadow-md">
                          {cat.title}
                        </p>
                        <p className="text-emerald-300 text-[11px] font-medium tracking-wide">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4 line-clamp-3 font-[Inter]">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100">
                    <a
                      href="#contact"
                      id={`category-bento-${cat.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F9D7A] hover:text-[#0B1F3A] transition-colors group/link"
                    >
                      <span>Request Sourcing Spec</span>
                      <HiArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
