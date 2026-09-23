import { HiArrowRight, HiCheckCircle } from 'react-icons/hi'

interface Industry {
  id: string
  title: string
  headline: string
  description: string
  image: string
  highlights: string[]
}

const industries: Industry[] = [
  {
    id: 'retail',
    title: 'Retail & Multi-Store Brands',
    headline: 'Private Label & Consumer Goods at Scale',
    description:
      'We partner with regional and national retailers to source private-label product lines, seasonal stock, and household merchandise from verified manufacturers with guaranteed lead times and flexible MOQs.',
    image: '/ind_retail_1790144526101.jpg',
    highlights: ['Custom Barcode & Packaging Compliance', 'Flexible Container Splitting', 'FMCG & Non-Food Retail'],
  },
  {
    id: 'manufacturing',
    title: 'Industrial Manufacturing',
    headline: 'Continuous Supply of Raw Materials & Accessory Parts',
    description:
      'Keep production lines uninterrupted. We coordinate scheduled deliveries of industrial raw materials, alloys, precision CNC components, and hydraulic assemblies directly to factory floor staging bays.',
    image: '/ind_manufacturing_1790144594818.jpg',
    highlights: ['Mill Test Certificates (MTC)', 'Just-In-Time (JIT) Consignment Scheduling', 'Strict Defect Tolerances'],
  },
  {
    id: 'wholesale',
    title: 'Wholesale & Trade Distributors',
    headline: 'Bulk Volume Sourcing & Palletised Distribution',
    description:
      'Wholesale operators benefit from our institutional purchasing power, consolidated maritime freight rates, and bonded UK warehousing partnerships across key logistics corridors.',
    image: '/ind_wholesale_1790144633907.jpg',
    highlights: ['Tiered Volume Price Rebates', 'Bonded Warehouse Facilities', 'Full Container Load (FCL) Specialists'],
  },
  {
    id: 'fashion-brands',
    title: 'Fashion Brands & Designers',
    headline: 'Bespoke Collections, Sample Prototyping & Custom Apparel',
    description:
      'We partner with contemporary fashion designers, boutique labels, and global apparel brands to turn concepts into market-ready collections—from precision tech-pack development and fabric sourcing to rapid prototype sampling and high-volume garment manufacturing.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Low MOQ & Rapid Prototype Sampling', 'Custom Pattern & Tech-Pack Engineering', 'Bespoke Trims, Labels & Finishing'],
  },
]

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="w-full py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">
            Industry Focus
          </p>
          <h2
            id="industries-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3A] tracking-tight mb-4"
          >
            Sectors We Empower
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed capitalize">
            Tailored supply chain workflows engineered to address the specific regulatory, logistical, and inventory requirements of your enterprise sector.
          </p>
        </div>

        {/* 4 Alternating Industry Blocks */}
        <div className="space-y-16 lg:space-y-20">
          {industries.map((ind, i) => (
            <div
              key={ind.id}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
            >
              {/* Image (6 cols) */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/10] bg-slate-100 group">
                  <img
                    src={ind.image}
                    alt={`${ind.title} industry sector`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20">
                    {ind.title}
                  </span>
                </div>
              </div>

              {/* Text content (6 cols) */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-600 mb-2">
                  Industry Solution
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-[Manrope] mb-3 leading-tight">
                  {ind.headline}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 capitalize">
                  {ind.description}
                </p>

                {/* Highlight badges */}
                <div className="space-y-2.5 mb-8 w-full">
                  {ind.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                      <HiCheckCircle className="text-amber-500 flex-shrink-0" size={18} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  id={`industry-inquire-${ind.id}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0B1F3A] hover:bg-[#142849] text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow group"
                >
                  <span>Inquire for {ind.title}</span>
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
