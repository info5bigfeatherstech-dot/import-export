import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TbMapPin,
  TbClock,
  TbCurrencyDollar,
  TbWorld,
  TbSparkles,
  TbCheck,
  TbX,
  TbSend,
  TbFileText,
  TbArrowRight,
  TbHeart,
  TbCertificate,
} from 'react-icons/tb'

interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

const positions: JobPosition[] = [
  {
    id: 'merchandiser-sr',
    title: 'Senior Garment Merchandiser',
    department: 'Merchandising',
    location: 'Mumbai / Surat, India (Hybrid)',
    type: 'Full-Time',
    experience: '4 - 7 Years',
    description:
      'Lead end-to-end sample development, costing, fabric approvals, and factory execution for international apparel buyers in Europe and North America.',
    responsibilities: [
      'Coordinate sample prototyping from CAD specs to pre-production sealed samples.',
      'Liaise with mills for fabric procurement, lab dips, and trim matching.',
      'Monitor production T&A (Time & Action) calendars to ensure 100% on-time vessel delivery.',
      'Communicate directly with international client procurement desks regarding order milestones.',
    ],
    requirements: [
      'Degree in Textile/Fashion Technology or Garment Manufacturing.',
      'Deep knowledge of woven and knit apparel costing and fabric consumption.',
      'Proficiency in ERP and international trade documentation.',
    ],
  },
  {
    id: 'qa-specialist',
    title: 'Textile & Garment Quality Inspector',
    department: 'Quality Assurance',
    location: 'Surat, India (On-site Factory Visits)',
    type: 'Full-Time',
    experience: '3 - 5 Years',
    description:
      'Perform rigorous in-line and final pre-shipment inspections (AQL 2.5) across partner garment factories and textile processing mills.',
    responsibilities: [
      'Conduct 4-point fabric inspection and dimensional stability verification.',
      'Perform inline stitch reviews, colorfastness checks, and trim audit reports.',
      'Issue digital CAP (Corrective Action Plan) reports prior to carton sealing.',
      'Ensure zero compliance deviations before final export clearance.',
    ],
    requirements: [
      'Proven field experience in AQL inspection standards within export houses.',
      'Strong eye for sewing workmanship, shade variation, and garment measurements.',
      'Willingness to travel to manufacturing partner facilities.',
    ],
  },
  {
    id: 'export-logistics',
    title: 'International Logistics & Customs Coordinator',
    department: 'Logistics',
    location: 'London, UK / Remote',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    description:
      'Manage multimodal shipping logistics, freight forwarding contracts, customs filings (EORI, HS Code classifications), and container bookings worldwide.',
    responsibilities: [
      'Coordinate ocean freight (FCL/LCL) and air cargo bookings with major shipping lines.',
      'Draft and verify Bill of Lading (B/L), Certificates of Origin, Packing Lists, and Commercial Invoices.',
      'Monitor port clearance, demurrage management, and real-time transit tracking.',
      'Ensure compliance with UK HMRC and destination import regulations.',
    ],
    requirements: [
      'Comprehensive background in international maritime shipping and incoterms (FOB, CIF, DDP).',
      'Hands-on experience with freight forwarding platforms and customs portals.',
      'Exceptional coordination and crisis-resolution skills.',
    ],
  },
  {
    id: 'b2b-sales-lead',
    title: 'International B2B Fashion Sales Executive',
    department: 'Sales & Growth',
    location: 'London, UK (Hybrid)',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    description:
      'Drive new client acquisitions among fashion brands, workwear retailers, and textile wholesalers across the UK, EU, and Middle East.',
    responsibilities: [
      'Identify and consult with apparel retailers seeking offshore manufacturing and fabric sourcing.',
      'Present ShivaSun Moderno Impex capabilities, catalogs, and customized trade solutions.',
      'Negotiate commercial contracts, MOQs, and seasonal delivery schedules.',
      'Represent the company at leading international textile trade expos.',
    ],
    requirements: [
      'Proven track record in B2B fashion wholesale or textile sourcing sales.',
      'Strong network with retail procurement managers and brand merchandisers.',
      'Excellent verbal presentation and relationship-building abilities.',
    ],
  },
  {
    id: 'fabric-sourcing-specialist',
    title: 'Fabric Sourcing & Trims Specialist',
    department: 'Merchandising',
    location: 'Mumbai, India',
    type: 'Full-Time',
    experience: '2 - 5 Years',
    description:
      'Source trendy, high-quality, and cost-effective textiles, tailoring accessories, and trims to meet fast-paced buyer specifications.',
    responsibilities: [
      'Build relationships with certified weaving, knitting, and accessory mills.',
      'Source innovative sustainable fabrics, zippers, buttons, and custom branded trims.',
      'Maintain an active library of seasonal textile swatches and technical data sheets.',
      'Negotiate raw material pricing to preserve healthy commercial margins.',
    ],
    requirements: [
      'Deep technical understanding of fabric construction, finishes, and trim quality.',
      'Strong supplier network across South Asian textile manufacturing hubs.',
      'Analytical mindset with sharp negotiation capabilities.',
    ],
  },
]

export default function CareerPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All')
  const [activeModalJob, setActiveModalJob] = useState<JobPosition | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: '',
    message: '',
  })

  const departments = ['All', 'Merchandising', 'Quality Assurance', 'Logistics', 'Sales & Growth']

  const filteredPositions =
    selectedDept === 'All'
      ? positions
      : positions.filter((p) => p.department === selectedDept)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      // simulate network send
    }, 500)
  }

  const closeModal = () => {
    setActiveModalJob(null)
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '', linkedin: '', experience: '', message: '' })
  }

  const perks = [
    {
      icon: TbWorld,
      title: 'Global Exposure',
      desc: 'Collaborate with international fashion houses, textile mills, and logistics partners across 35+ countries.',
    },
    {
      icon: TbCurrencyDollar,
      title: 'Competitive Compensation',
      desc: 'Market-leading base salaries paired with lucrative annual performance bonuses and project rewards.',
    },
    {
      icon: TbCertificate,
      title: 'Continuous Learning',
      desc: 'Subsidized professional certifications in supply chain management, quality inspection, and international trade.',
    },
    {
      icon: TbHeart,
      title: 'Comprehensive Health & Wellness',
      desc: 'Full medical coverage for you and your dependents with wellness allowances and balanced hybrid work policies.',
    },
  ]

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B1F3A] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-600 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            <TbSparkles size={14} />
            Careers at ShivaSun Moderno Impex Private Limited
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-[Manrope] tracking-tight leading-tight mb-6">
            Shape the Future of <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Global Trade & Fashion</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            Join our dynamic team of trade specialists, garment merchandisers, and logistics innovators connecting world-class manufacturers with global fashion retailers.
          </p>

          <a
            href="#openings"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200"
          >
            <span>Explore Open Positions ({positions.length})</span>
            <TbArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* 2. CULTURE & PERKS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Why Work With Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight mt-2 mb-3">
              Empowering Talent to Excel on the Global Stage
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              At ShivaSun Moderno Impex Private Limited, we cultivate an agile, entrepreneurial culture where initiative is celebrated and high standards drive our collective success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => {
              const Icon = perk.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm text-amber-500 flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-bold text-[#0B1F3A] font-[Manrope] mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. JOB OPENINGS BOARD */}
      <section id="openings" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                Current Opportunities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight mt-1">
                Open Career Positions
              </h2>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedDept === dept
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Positions List */}
          <div className="space-y-4">
            {filteredPositions.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[11px] uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[11px]">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1F3A] font-[Manrope]">
                      {job.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
                      <div className="flex items-center gap-1.5">
                        <TbMapPin size={15} className="text-amber-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TbClock size={15} className="text-amber-500" />
                        <span>Exp: {job.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    <button
                      type="button"
                      onClick={() => setActiveModalJob(job)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 text-xs font-bold transition-all shadow-sm hover:shadow"
                    >
                      View Details & Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Inquiries Box */}
          <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0B1F3A] flex items-center justify-center mx-auto mb-4">
              <TbFileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] font-[Manrope] mb-2">
              Don't See the Perfect Match?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed">
              We are constantly seeking ambitious trade executives, merchandising talents, and logistics specialists. Send your CV directly to our HR desk.
            </p>
            <a
              href="mailto:careers@shivasunmoderno.com"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              <span>careers@shivasunmoderno.com</span>
              <TbArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION MODAL */}
      <AnimatePresence>
        {activeModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 bg-[#0B1F3A] text-white flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
                    Job Application
                  </span>
                  <h3 className="text-lg font-bold font-[Manrope]">{activeModalJob.title}</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close modal"
                >
                  <TbX size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl">
                      <TbCheck size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-[#0B1F3A] font-[Manrope]">
                      Application Submitted Successfully!
                    </h4>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      Thank you for applying for the position of{' '}
                      <strong>{activeModalJob.title}</strong> at ShivaSun Moderno Impex Private Limited. Our HR team will review your qualifications and reach out within 3 business days.
                    </p>
                    <button
                      onClick={closeModal}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-bold"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Role Summary */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs space-y-2">
                      <div className="font-bold text-[#0B1F3A]">Key Responsibilities:</div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        {activeModalJob.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Phone Number *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 72979 60397"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            LinkedIn / Portfolio URL
                          </label>
                          <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cover Note & Sourcing/Trade Experience
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us briefly about your experience in apparel, fabrics, or supply chain logistics..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/25 inline-flex items-center gap-2"
                        >
                          <TbSend size={14} />
                          <span>Submit Application</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
