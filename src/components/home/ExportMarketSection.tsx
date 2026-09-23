import { motion } from 'framer-motion'
import { TbArrowRight } from 'react-icons/tb'
import WorldMap from '@/components/ui/world-map'

interface MarketBadge {
  flag: string
  label: string
  sublabel: string
}

const targetMarkets: MarketBadge[] = [
  { flag: '🇬🇧', label: 'UNITED KINGDOM', sublabel: 'NƯỚC ANH' },
  { flag: '🇦🇺', label: 'AUSTRALIA', sublabel: 'NƯỚC ÚC' },
  { flag: '🇺🇸', label: 'UNITED STATES', sublabel: 'NƯỚC MỸ' },
  { flag: '🇪🇺', label: 'EUROPEAN UNION', sublabel: 'CHÂU ÂU' },
]

const tradeRoutes = [
  {
    start: { lat: 21.0285, lng: 105.8542, label: 'Factory Hub' }, // SE Asia
    end: { lat: 51.5074, lng: -0.1278, label: 'UK' }, // London, UK
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 40.7128, lng: -74.006, label: 'USA' }, // New York, USA
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 48.2082, lng: 16.3738, label: 'EU' }, // Central Europe
  },
  {
    start: { lat: 21.0285, lng: 105.8542 }, // SE Asia
    end: { lat: -33.8688, lng: 151.2093, label: 'Australia' }, // Sydney
  },
  {
    start: { lat: 51.5074, lng: -0.1278 }, // London
    end: { lat: 25.2048, lng: 55.2708, label: 'Middle East' }, // Dubai
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
              <span className="w-10 h-[2px] bg-[#0F9D7A]" />
              <p className="text-xs font-bold tracking-[0.22em] text-[#0F9D7A] uppercase font-[Manrope]">
                Export Market
              </p>
            </div>

            {/* Main Headline in Theme Green */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#0B7A5E] uppercase tracking-tight leading-[1.18] mb-5 font-[Manrope]">
              PROVIDING INTERNATIONAL <br className="hidden sm:inline" />
              STANDARD GARMENT PRODUCTS
            </h2>

            {/* Description Copy */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 font-[Inter] max-w-xl">
              BritTrade Global not only provides services and products to domestic
              businesses and brands but also expands to international markets. With
              considerable dedication, the company&apos;s export products consistently
              meet international standards with high quality, accompanied by
              competitive pricing compared to the general market.
            </p>

            {/* Pill Outline Button in Theme Green */}
            <div>
              <a
                href="#contact"
                id="export-market-see-more"
                className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full border-2 border-[#0F9D7A] text-[#0F9D7A] hover:bg-[#0F9D7A] hover:text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#0F9D7A]/20 group"
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
            {/* Flag Badges Header Row */}
            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 sm:gap-5 mb-5">
              {targetMarkets.map((market) => (
                <div
                  key={market.label}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs hover:border-[#0F9D7A]/40 transition-colors"
                >
                  <span className="text-lg sm:text-xl drop-shadow-xs" role="img" aria-label={market.label}>
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

            {/* Aceternity Interactive Dotted World Map in High-Tech Dark Terminal */}
            <div className="relative w-full rounded-3xl overflow-hidden bg-[#030712] p-2 sm:p-3 border border-slate-800/90 shadow-2xl shadow-emerald-950/30 group">
              <WorldMap
                dots={tradeRoutes}
                lineColor="#10B981"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
