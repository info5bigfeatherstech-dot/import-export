import { Link, useParams } from 'react-router-dom'
import {
  TbArrowRight,
  TbClock,
  TbBuildingFactory2,
  TbShieldCheck,
  TbSparkles,
  TbCheck,
  TbPhone,
  TbFileCertificate,
} from 'react-icons/tb'
import { servicesData } from '../data/services'

export default function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId?: string }>()

  // Find the selected service or default to first
  const currentService =
    servicesData.find((s) => s.id === serviceId) || servicesData[0]

  const Icon = currentService.icon

  // The other 3 services for recommendations
  const otherServices = servicesData.filter((s) => s.id !== currentService.id)

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B1F3A] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/#apparel-services" className="hover:text-amber-400 transition-colors">
              Manufacturing Services
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{currentService.shortTitle}</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Service {currentService.number} • ShivaSun Moderno Impex
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-[Manrope] tracking-tight leading-tight mb-6">
              {currentService.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-[Inter]">
              {currentService.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200"
              >
                <span>Request Commercial Quotation</span>
                <TbArrowRight size={16} />
              </Link>
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all duration-200"
              >
                <span>Explore 5-Stage Process</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-500 flex items-center justify-center shrink-0">
                <TbClock size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Turnaround</div>
                <div className="text-sm font-bold text-white font-[Manrope]">{currentService.leadTime}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-500 flex items-center justify-center shrink-0">
                <TbBuildingFactory2 size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Capacity</div>
                <div className="text-sm font-bold text-white font-[Manrope]">{currentService.capacity}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-500 flex items-center justify-center shrink-0">
                <TbShieldCheck size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quality Protocol</div>
                <div className="text-sm font-bold text-white font-[Manrope]">{currentService.qualityStandard}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-500 flex items-center justify-center shrink-0">
                <TbSparkles size={20} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Distinct Advantage</div>
                <div className="text-sm font-bold text-white font-[Manrope]">{currentService.keyHighlight}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IN-DEPTH OVERVIEW & VISUAL SHOWCASE */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Visual Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] group">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091422]/90 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600 block mb-1">
                      Certified Manufacturing Excellence
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-[Manrope]">
                      {currentService.shortTitle} Division
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 items-center gap-3.5 max-w-xs">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B1F3A]">Strict Quality Assurance</div>
                  <div className="text-[11px] text-slate-500">Every consignment 100% audited</div>
                </div>
              </div>
            </div>

            {/* Right Column: Capabilities & Specializations */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                ✦ Production Scope & Focus
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight leading-snug">
                Tailored for Retailers, Manufacturers & Distributors
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you need specialized denim washes, high-volume cotton apparel, custom tailoring trims, footwear lines, or bespoke sourcing per customer requirement, ShivaSun Moderno Impex Private Limited executes your order with precision and full transparency.
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                  Specialized Industry Capabilities:
                </div>
                {currentService.specializations.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <TbCheck size={13} />
                    </div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS WORKFLOW */}
      <section id="workflow" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Execution Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight mt-2 mb-4">
              5-Stage Quality & Delivery Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              From the initial technical brief to final dispatch, every step is rigorously monitored to guarantee defect-free results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {currentService.processSteps.map((stepItem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between capitalize"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B1F3A] font-extrabold text-sm flex items-center justify-center mb-4 font-[Manrope] capitalize">
                    {stepItem.step}
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] font-[Manrope] mb-2 leading-tight capitalize">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed capitalize">
                    {stepItem.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-600">
                  <span>Verified Stage</span>
                  <TbCheck size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DELIVER (DELIVERABLES GRID) */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                Guaranteed Output
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-[Manrope]">
                What You Receive With This Service
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe in complete commercial transparency. Every contract includes a clearly defined deliverable package so you always know what to expect.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider"
                >
                  <span>Inquire with your technical requirements</span>
                  <TbArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentService.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <TbFileCertificate size={18} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {deliv}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE OTHER SERVICES SWITCHER */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                Explore Full Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-[Manrope] mt-1">
                Other Manufacturing Services
              </h2>
            </div>
            <Link
              to="/#apparel-services"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5"
            >
              <span>View All on Homepage</span>
              <TbArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => {
              const OtherIcon = other.icon
              return (
                <Link
                  key={other.id}
                  to={`/services/${other.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B1F3A] group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-400 group-hover:text-slate-950 transition-colors flex items-center justify-center">
                        <OtherIcon size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 font-[Manrope]">
                        {other.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B1F3A] font-[Manrope] mb-2 group-hover:text-amber-400 transition-colors">
                      {other.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {other.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                    <span>Read Details</span>
                    <TbArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0D284C] to-[#0B1F3A] text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Direct Trade Desk
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-[Manrope] tracking-tight mt-2 mb-4">
              Ready to Start {currentService.shortTitle}?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Connect directly with our merchandising and logistics desk. We provide formal costing breakdowns, fabric swatches, and production schedules within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
              >
                Inquire For This Service
              </Link>
              <a
                href="tel:+917297960397"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <TbPhone size={16} />
                <span>+91 72979 60397</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
