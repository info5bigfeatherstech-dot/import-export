import { HiArrowRight, HiPhone, HiMail, HiClock } from 'react-icons/hi'

export default function CtaSection() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="w-full py-20 lg:py-28 bg-[#0B1F3A] text-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 world-map-pattern opacity-15 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0F9D7A]/20 via-transparent to-[#142849]/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-[#0F9D7A]/40 bg-[#0F9D7A]/10 text-[#0F9D7A] text-xs font-semibold tracking-wider uppercase mb-5">
            Direct Trade Advisory
          </span>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight"
          >
            Ready to Expand Your Import & Export Trade?
          </h2>

          <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Connect directly with an accredited UK trade director. We assess product availability, customs classifications, multimodal freight schedules, and provide a verified CIF quote within 24 hours.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="mailto:trade@brittradeglobal.co.uk?subject=Import%20Export%20Quotation%20Request"
              id="cta-get-quote"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0F9D7A] hover:bg-[#0C7A60] text-white font-bold text-sm sm:text-base rounded-xl shadow-xl hover:shadow-emerald-900/40 transition-all duration-200 group"
            >
              <span>Request Free Trade Call</span>
              <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={18} />
            </a>
            <a
              href="tel:+917297960397"
              id="cta-contact-team"
              className="inline-flex items-center gap-2.5 px-7 py-4 border border-white/25 hover:border-white/60 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors duration-200 hover:bg-white/10"
            >
              <HiPhone className="text-[#0F9D7A]" size={18} />
              <span>+91 72979 60397</span>
            </a>
          </div>

          {/* Three fast facts & Career Anchor */}
          <div id="career" className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300">
              <HiClock className="text-[#0F9D7A]" size={18} />
              <span>24-Hour Turnaround</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300">
              <HiMail className="text-[#0F9D7A]" size={18} />
              <span>careers@shivasunmoderno.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#0F9D7A]" />
              <span>Global Careers & Opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
