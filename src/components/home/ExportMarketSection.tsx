import { motion } from 'framer-motion'
import { TbArrowRight } from 'react-icons/tb'
import WorldMap from '@/components/ui/world-map'

interface MarketBadge {
  flag: string
  label: string
  sublabel: string
}

const targetMarkets: MarketBadge[] = [
  { flag: '🇬🇧', label: 'UNITED KINGDOM', sublabel: 'Primary Trade Hub' },
  { flag: '🇨🇳', label: 'CHINA', sublabel: 'Manufacturing & Sourcing' },
  { flag: '🇿🇦', label: 'SOUTH AFRICA', sublabel: 'African Trade Corridor' },
  { flag: '🇺🇸', label: 'UNITED STATES', sublabel: 'North America' },
]

const tradeRoutes = [
  {
    start: { lat: 31.2304, lng: 121.4737, label: 'China' }, // Shanghai / China
    end: { lat: 51.5074, lng: -0.1278, label: 'UK' }, // London, UK
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London, UK
    end: { lat: -29.8587, lng: 31.0218, label: 'South Africa' }, // South Africa
  },
  {
    start: { lat: 31.2304, lng: 121.4737 }, // China
    end: { lat: -29.8587, lng: 31.0218 }, // South Africa
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // UK
    end: { lat: 40.7128, lng: -74.006, label: 'USA' }, // USA
  },
  {
    start: { lat: 31.2304, lng: 121.4737 }, // China
    end: { lat: 25.2048, lng: 55.2708, label: 'Middle East' }, // Middle East
  },
]

export default function ExportMarketSection() {
  return (
    <section
      id="export-markets"
      aria-label="Export Markets"
      className="relative w-full bg-[#F8FAFC] py-20 lg:py-28 overflow-hidden border-t border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Headline, Story & Pill Button */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            {/* Horizontal Line Kicker */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400" />
              <p className="text-xs font-bold tracking-[0.22em] text-amber-600 uppercase font-[Manrope]">
                Export Market
              </p>
            </div>

            {/* Main Headline in Theme Gold/Navy */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#0B1F3A] uppercase tracking-tight leading-[1.18] mb-5 font-[Manrope]">
              PROVIDING INTERNATIONAL <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">STANDARD GARMENT PRODUCTS</span>
            </h2>

            {/* Description Copy */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-[Inter] max-w-xl">
              ShivaSun Moderno Impex Private Limited provides comprehensive
              import-export services across major international markets. With
              rigorous quality standards, competitive pricing, and certified
              multimodal supply chains, our consignments consistently meet
              global commercial benchmarks.
            </p>

            {/* Pill Outline Button in Theme Amber */}
            <div>
              <a
                href="#contact"
                id="export-market-see-more"
                className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full border-2 border-amber-500 text-amber-600 hover:bg-gradient-to-r hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 hover:border-transparent hover:text-slate-950 font-bold text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-400/20 group"
              >
                <span>See More</span>
                <TbArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Country Flag Badges & Aceternity World Map */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Header Row: Flags */}
            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2.5 sm:gap-3 mb-5">
              {targetMarkets.map((market) => (
                <div
                  key={market.label}
                  className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs hover:border-amber-400/40 transition-colors"
                >
                  <span className="text-base sm:text-lg drop-shadow-xs" role="img" aria-label={market.label}>
                    {market.flag}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-800 uppercase font-[Manrope] leading-tight">
                      {market.label}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 leading-tight">
                      {market.sublabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Aceternity Interactive Dotted World Map in Light Modern Theme */}
            <WorldMap
              dots={tradeRoutes}
              theme="light"
              lineColor="#F59E0B"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
