import {
  TbSearch,
  TbStars,
  TbShip,
  TbFileCheck,
} from 'react-icons/tb'

const steps = [
  {
    step: '01',
    icon: TbSearch,
    title: 'Product Sourcing',
    description:
      'We audit certified UK and international manufacturers matching your exact technical specifications, batch sizes, and target CIF pricing.',
    deliverables: ['Factory Audits', 'Sample Approval', 'Price Lock Agreements'],
  },
  {
    step: '02',
    icon: TbStars,
    title: 'Quality Verification',
    description:
      'Independent lab analysis and pre-shipment quality assurance reports verifying chemical composition, packaging standards, and durability.',
    deliverables: ['Pre-Shipment Audit', 'Phytosanitary/CE Docs', 'Batch Testing'],
  },
  {
    step: '03',
    icon: TbShip,
    title: 'Multimodal Freight',
    description:
      'Coordinated transport via ocean container (FCL/LCL), air cargo, or bonded road freight with full marine cargo insurance coverage.',
    deliverables: ['Direct Ocean Bill of Lading', 'Live GPS Tracking', 'Marine Insurance'],
  },
  {
    step: '04',
    icon: TbFileCheck,
    title: 'Customs & Delivery',
    description:
      'End-to-end HMRC EORI declaration, import tariff clearance, destination port handling, and scheduled delivery to your warehouse docks.',
    deliverables: ['Customs Release', 'Certificate of Origin', 'Final Mile Delivery'],
  },
]

export default function TradeProcess() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="w-full py-20 lg:py-28 bg-white border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">
            Execution Framework
          </p>
          <h2
            id="process-heading"
            className="text-3xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F3A] tracking-tight mb-4"
          >
            Our 4-Stage Trade Process
          </h2>
          <p className="text-slate-600 text-base sm:text-base leading-relaxed capitalize">
            From initial procurement brief to final dockside container discharge, every milestone is managed by dedicated UK trade officers with zero guesswork.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-amber-400/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Step number badge & icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-black font-[Manrope] text-amber-500">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#0B1F3A]">
                  <item.icon size={26} className="text-amber-500" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#0B1F3A] font-[Manrope] mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 capitalize">
                {item.description}
              </p>

              {/* Deliverable bullets */}
              <div className="pt-4 border-t border-slate-200/80 space-y-1.5">
                {item.deliverables.map((del) => (
                  <div key={del} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
