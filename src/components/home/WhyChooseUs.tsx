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

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      aria-labelledby="why-choose-heading"
      className="w-full py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">
            The British Advantage
          </p>
          <h2
            id="why-choose-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-5 leading-tight font-[Manrope]"
          >
            A Trade Partner Built on Reliability & Precision
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl capitalize">
            Cross-border commerce demands absolute compliance and supply chain certainty. BritTrade Global bridges UK industry with global commerce through stringent quality controls and frictionless logistics.
          </p>
        </div>

        {/* 4 Feature Cards in a balanced 4-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-amber-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                  <feat.icon size={26} />
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] font-[Manrope] mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
