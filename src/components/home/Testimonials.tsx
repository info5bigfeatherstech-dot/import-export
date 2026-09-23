import { TbQuote, TbStarFilled } from 'react-icons/tb'

interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  country: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'BritTrade Global restructured our UK food import procurement. Delivering certified British gourmet provisions to our Gulf regional distribution centers with complete customs documentation in under 14 days was game-changing for our retail margin.',
    name: 'Tariq Al-Mansoor',
    title: 'Chief Procurement Officer',
    company: 'Gulf Retail Logistics Group',
    country: 'United Arab Emirates 🇦🇪',
    initials: 'TM',
  },
  {
    id: 'testimonial-2',
    quote:
      'The pre-shipment quality audit protocol gave our executive board total peace of mind. Over 40 container loads of precision engineering parts have arrived at our Frankfurt facility with zero defect notices. The gold standard in British trade.',
    name: 'Helena Schmidt',
    title: 'Director of Strategic Sourcing',
    company: 'Schmidt Industrial AG',
    country: 'Germany 🇩🇪',
    initials: 'HS',
  },
  {
    id: 'testimonial-3',
    quote:
      'Handling import tariffs, EORI clearance, and maritime shipping into West Africa can be full of friction. BritTrade managed our textile shipments from Manchester mills with complete transparency and zero port demurrage costs.',
    name: 'Kofi Mensah',
    title: 'Managing Director',
    company: 'Mensah Commercial Imports',
    country: 'Ghana 🇬🇭',
    initials: 'KM',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full py-20 lg:py-28 bg-white border-b border-slate-200"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-3">
            Client Endorsements
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-4"
          >
            Verified Client Experiences
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Leading import directors and supply chain managers share their experience trading through BritTrade Global.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-400/50 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <TbStarFilled key={i} size={17} />
                    ))}
                  </div>
                  <TbQuote size={30} className="text-amber-500 opacity-40" />
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-5 border-t border-slate-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-sm tracking-wider flex-shrink-0 shadow-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B1F3A] font-[Manrope]">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.title}, {t.company}
                  </p>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">
                    {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
