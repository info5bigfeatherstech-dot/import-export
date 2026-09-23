import {
  TbBuildingWarehouse,
  TbTruckDelivery,
  TbZoomCheck,
  TbCoins,
} from 'react-icons/tb'

const features = [
  {
    id: 'suppliers',
    icon: TbBuildingWarehouse,
    title: 'Verified Global Suppliers',
    description:
      'Rigorous supplier onboarding including corporate vetting, manufacturing capacity audits, and export license verification.',
  },
  {
    id: 'logistics',
    icon: TbTruckDelivery,
    title: 'End-to-End Multimodal Freight',
    description:
      'Direct carrier contracting for FCL, LCL, air cargo, and cross-border road transit, fully bonded with real-time consignment visibility.',
  },
  {
    id: 'quality',
    icon: TbZoomCheck,
    title: 'Quality & Pre-Shipment Inspection',
    description:
      'Independent third-party inspection (SGS/Bureau Veritas standards) with full batch certificates before any cargo departs UK docks.',
  },
  {
    id: 'pricing',
    icon: TbCoins,
    title: 'Competitive Volume Pricing',
    description:
      'Institutional trade leverage and volume purchasing agreements that eliminate broker markups and protect buyer margins.',
  },
]

const performanceMetrics = [
  { label: 'Consignment On-Time Delivery', value: '98.4%', width: '98.4%' },
  { label: 'Quality Audit Pass Rate', value: '99.2%', width: '99.2%' },
  { label: 'Client Annual Retention', value: '94.8%', width: '94.8%' },
  { label: 'Customs Clearance Without Delay', value: '96.5%', width: '96.5%' },
]

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      aria-labelledby="why-choose-heading"
      className="w-full py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content (7 cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-widest text-[#0F9D7A] uppercase mb-3">
              The British Advantage
            </p>
            <h2
              id="why-choose-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-6 leading-tight"
            >
              A Trade Partner Built on Reliability & Precision
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl capitalize">
              Cross-border commerce demands absolute compliance and supply chain certainty. BritTrade Global bridges UK industry with global commerce through stringent quality controls and frictionless logistics.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feat) => (
                <div
                  key={feat.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-[#0F9D7A]/40 hover:shadow transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#0F9D7A]/10 text-[#0F9D7A] flex items-center justify-center mb-3.5">
                    <feat.icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] font-[Manrope] mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Infographic Report Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#0B1F3A] border border-white/10 p-7 sm:p-9 shadow-2xl text-white">
              {/* Pattern */}
              <div className="absolute inset-0 world-map-pattern opacity-15 pointer-events-none" />

              <div className="relative z-10">
                <div className="border-b border-white/10 pb-6 mb-6">
                  <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-[#0F9D7A] mb-1">
                    Audited Performance
                  </span>
                  <h3 className="text-2xl font-bold font-[Manrope] text-white">
                    2024 Trade Report
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Independent verification across 500+ maritime and air freight shipments.
                  </p>
                </div>

                {/* Progress bars */}
                <div className="space-y-5 mb-8">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                        <span className="text-slate-200">{metric.label}</span>
                        <span className="text-[#0F9D7A] font-bold font-[Manrope]">{metric.value}</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0F9D7A] to-[#13B98F] rounded-full transition-all duration-1000"
                          style={{ width: metric.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom stats row */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-2xl font-extrabold text-white font-[Manrope]">15+</p>
                    <p className="text-[11px] text-slate-400 font-medium">Years Active</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-2xl font-extrabold text-[#0F9D7A] font-[Manrope]">500+</p>
                    <p className="text-[11px] text-slate-400 font-medium">Global Buyers</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-2xl font-extrabold text-white font-[Manrope]">35+</p>
                    <p className="text-[11px] text-slate-400 font-medium">Destinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
