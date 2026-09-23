import { motion } from 'framer-motion'
import { TbArrowUpRight, TbCheck } from 'react-icons/tb'

export default function FactoryShowcase() {
  const capabilities = [
    'Product Design & Development',
    'OEM / ODM / FOB / Private Label',
    'Denim Wash & Finishing',
    'Quality Control & Export Standards',
  ]

  return (
    <section
      id="manufacturing-hub"
      aria-label="Manufacturing Facility"
      className="relative w-full bg-white text-slate-800 py-20 lg:py-28 overflow-hidden border-t border-slate-100"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Main Factory Facility Building */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 group">
              <img
                src="/factory_exterior.jpg"
                alt="GENVIET Factory headquarters and modern apparel manufacturing facility"
                className="w-full h-auto max-h-[580px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 z-10">
                <p className="text-white text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-[Manrope] drop-shadow-md">
                  GENVIET FACTORY
                </p>
                <p className="text-slate-300 text-[11px] font-medium tracking-wider">
                  Automated Apparel & Denim Facility
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Factory Story, Checkpoints, Production Floor Photo, & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow / Kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#0F9D7A] text-xs">✦</span>
              <p className="text-xs font-bold tracking-[0.22em] text-[#0F9D7A] uppercase font-[Manrope]">
                01 GENVIET FACTORY
              </p>
            </div>

            {/* Section Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#0B1F3A] leading-[1.12] mb-6 font-[Manrope]">
              More Than A <br className="hidden sm:inline" />
              Manufacturing Factory.
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-[Inter]">
              <p>
                We support fashion brands throughout the product journey, from market research, design and sampling to manufacturing and finished-goods delivery.
              </p>
              <p>
                Built on the experience of the Genviet Jeans brand, GENVIET Factory understands brand requirements from a commercial perspective, not only a manufacturing one.
              </p>
            </div>

            {/* Sub-grid: Checkpoints + CTA Button on Left, Factory Floor Image on Right */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
              {/* Checklist & Button */}
              <div className="sm:col-span-7 space-y-6">
                <ul className="space-y-3">
                  {capabilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 text-[#0F9D7A]">
                        <TbCheck className="w-4 h-4 stroke-[3]" />
                      </span>
                      <span className="text-slate-800 text-sm sm:text-[15px] font-medium leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <a
                    href="#contact"
                    id="factory-capabilities-btn"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0F9D7A] hover:bg-[#0B7A5E] text-white font-bold text-sm sm:text-base rounded-md shadow-lg shadow-[#0F9D7A]/25 hover:shadow-xl hover:shadow-[#0F9D7A]/35 transition-all duration-200 group hover:-translate-y-0.5"
                  >
                    <TbArrowUpRight
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      size={18}
                    />
                    <span>View Capabilities & Services</span>
                  </a>
                </div>
              </div>

              {/* Secondary Image: Production Sewing Floor */}
              <div className="sm:col-span-5">
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src="/factory_floor.jpg"
                    alt="Active apparel sewing floor and manufacturing line"
                    className="w-full h-auto max-h-[290px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-wider uppercase text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                    Sewing & Assembly Lines
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Large Background Watermark Text across the bottom */}
      <div
        className="pointer-events-none select-none overflow-hidden mt-14 -mb-10 w-full whitespace-nowrap opacity-[0.07]"
        aria-hidden="true"
      >
        <p
          className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-widest text-slate-900"
          style={{
            WebkitTextStroke: '1.5px currentColor',
            color: 'transparent',
          }}
        >
          DENIM HERITAGE • PRODUCT DEVELOPMENT • APPAREL MANUFACTURING • QUALITY CONTROL
        </p>
      </div>
    </section>
  )
}
