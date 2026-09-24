import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
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
  TbEye,
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
    id: 'merchandising',
    title: 'Merchandising',
    department: 'Merchandising',
    location: 'Surat / Mumbai, India (Hybrid)',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    description:
      'Lead end-to-end sample development, costing sheets, T&A calendars, fabric approvals, and factory execution for international apparel buyers.',
    responsibilities: [
      'Oversee Time & Action (T&A) calendars from initial tech pack receipt to final shipment packing.',
      'Liaise with mills for fabric procurement, lab dip color matching, and trim approvals.',
      'Coordinate sample prototyping from CAD specs to pre-production sealed samples.',
      'Communicate directly with international buyer procurement desks regarding production milestones.',
    ],
    requirements: [
      'Degree in Textile/Fashion Technology or Garment Merchandising.',
      'Deep knowledge of woven and knit apparel costing and fabric consumption.',
      'Proficiency in ERP systems and international trade documentation.',
    ],
  },
  {
    id: 'design-product-development',
    title: 'Design & Product Development',
    department: 'Design & Product Development',
    location: 'Surat / Mumbai, India (Design Studio)',
    type: 'Full-Time',
    experience: '3 - 5 Years',
    description:
      'Create seasonal trend forecast boards, CAD sketches, technical tech packs, and innovative garment silhouettes for global private label programs.',
    responsibilities: [
      'Develop seasonal fashion collections across menswear, womenswear, and performance lines.',
      'Produce production-ready CAD sketches, specification sheets, and grading charts.',
      'Collaborate with master tailors and sample rooms for fit perfection and fabric drape testing.',
      'Research international color trends, sustainable textile finishes, and trim innovations.',
    ],
    requirements: [
      'Degree in Fashion Design from a recognized institute (NIFT/Pearl/equivalent).',
      'Proficiency in Adobe Illustrator, Photoshop, and 3D fashion tools (CLO 3D / Browzwear).',
      'Strong eye for garment ergonomics, construction details, and material aesthetics.',
    ],
  },
  {
    id: 'quality-control',
    title: 'Quality Control',
    department: 'Quality Control',
    location: 'Surat / Ahmedabad, India (Factory Floor)',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    description:
      'Enforce zero-defect export quality standards through 4-point fabric inspection, in-line stitching audits, and final AQL 2.5 pre-shipment certifications.',
    responsibilities: [
      'Conduct 4-point fabric inspection and dimensional stability verification on raw textile rolls.',
      'Perform inline stitch reviews, colorfastness checks, pull-tests, and trim audit reports.',
      'Issue digital CAP (Corrective Action Plan) reports prior to master carton packing.',
      'Ensure 100% compliance with international buyer AQL standards and safety protocols.',
    ],
    requirements: [
      'Proven field experience in AQL 1.5 / 2.5 standards within leading apparel export houses.',
      'Sharp eye for sewing workmanship, shade variation, and garment measurements.',
      'Thorough knowledge of international physical and chemical apparel testing norms.',
    ],
  },
  {
    id: 'production-management',
    title: 'Production Management',
    department: 'Production Management',
    location: 'Surat, India (Manufacturing Facility)',
    type: 'Full-Time',
    experience: '5 - 8 Years',
    description:
      'Direct factory floor operations, sewing line balancing, daily capacity scheduling, and machine throughput to achieve 100% on-time vessel deliveries.',
    responsibilities: [
      'Plan and schedule production across cutting, sewing, washing, finishing, and packing divisions.',
      'Optimize assembly line balancing, SAM (Standard Allowed Minutes), and factory efficiency.',
      'Coordinate with procurement and store teams for timely fabric and trim availability.',
      'Enforce strict industrial safety, clean floor policies, and WRAP/BSCI factory compliance.',
    ],
    requirements: [
      'Degree in Industrial/Production Engineering or Garment Manufacturing Technology.',
      '5+ years managing high-volume garment or footwear manufacturing facilities.',
      'Strong leadership, lean manufacturing knowledge, and real-time problem-solving skills.',
    ],
  },
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    department: 'Sales & Marketing',
    location: 'London, UK / Remote / Hybrid',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    description:
      'Drive international B2B buyer acquisitions, retail brand partnerships, trade show exhibitions, and wholesale export expansion across global markets.',
    responsibilities: [
      'Identify and build relationships with fashion retailers, workwear brands, and textile wholesalers.',
      'Present ShivaSun Moderno Impex manufacturing capabilities and seasonal product catalogs.',
      'Negotiate commercial contracts, container MOQs, and FOB/CIF payment terms.',
      'Represent the enterprise at international trade fairs (Premiere Vision, Texworld, MAGIC).',
    ],
    requirements: [
      'Proven track record in international fashion wholesale or B2B export sales.',
      'Existing network with fashion brand procurement managers and buying houses.',
      'Exceptional verbal presentation and consultative deal-closing abilities.',
    ],
  },
  {
    id: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    department: 'Logistics & Supply Chain',
    location: 'Mumbai / London (Hybrid)',
    type: 'Full-Time',
    experience: '3 - 5 Years',
    description:
      'Manage international multimodal shipping logistics, freight forwarding contracts, customs filings, and container tracking worldwide.',
    responsibilities: [
      'Coordinate ocean freight (FCL/LCL) and air cargo bookings with major shipping lines.',
      'Draft and verify Bill of Lading (B/L), Certificates of Origin, Packing Lists, and Commercial Invoices.',
      'Monitor customs port filings, port clearance milestones, and demurrage avoidance.',
      'Ensure strict compliance with UK HMRC, US CBP, and destination import regulations.',
    ],
    requirements: [
      'Comprehensive background in international maritime shipping and incoterms (FOB, CIF, DDP).',
      'Hands-on experience with freight forwarding systems and customs documentation.',
      'Exceptional crisis-resolution and cross-border logistical tracking skills.',
    ],
  },
  {
    id: 'graphic-designer-photographer',
    title: 'Graphic Designer / Photographer',
    department: 'Graphic Designer / Photographer',
    location: 'Surat, India (In-House Studio)',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    description:
      'Shoot studio lookbooks, ghost mannequin photography, digital catalog visuals, and design client marketing collaterals and export packaging.',
    responsibilities: [
      'Capture studio product photos, ghost mannequin shots, and on-model apparel campaigns.',
      'Retouch, color-correct, and format high-resolution assets for digital catalogs and B2B lookbooks.',
      'Design promotional line sheets, seasonal collection brochures, and client presentations.',
      'Develop export packaging designs, hang tags, woven labels, and brand identity materials.',
    ],
    requirements: [
      'Portfolio demonstrating commercial fashion photography, product styling, and graphic design.',
      'Mastery of Adobe Creative Suite (Photoshop, Lightroom, InDesign, Illustrator).',
      'Experience with studio strobe lighting, camera systems, and digital asset workflows.',
    ],
  },
  {
    id: 'product-modeling',
    title: 'Product Modeling',
    department: 'Product Modeling',
    location: 'Surat / Mumbai, India (Studio Sessions)',
    type: 'Contract / Full-Time',
    experience: '1 - 3 Years',
    description:
      'Model seasonal apparel, footwear, and accessory lines for B2B buyer catalogs, digital lookbooks, and global campaign photoshoots.',
    responsibilities: [
      'Pose for studio catalog photography, editorial lookbooks, and fit test sessions.',
      'Showcase garment drape, movement, fit, and styling across casual, formal, and outerwear collections.',
      'Collaborate with stylists and photographers to achieve clean, high-fashion brand visuals.',
      'Provide ergonomic fit feedback to technical designers and pattern makers.',
    ],
    requirements: [
      'Experience in commercial fashion, catalog, or digital brand modeling.',
      'Strong camera presence, versatile posing capability, and professional work ethic.',
      'Comfortable working with diverse garment styles and studio lighting setups.',
    ],
  },
  {
    id: 'logistics-supply-chain-ops',
    title: 'Logistics & Supply Chain',
    department: 'Logistics & Supply Chain',
    location: 'Surat / Hazira Port, India (Warehouse & Dispatch)',
    type: 'Full-Time',
    experience: '2 - 5 Years',
    description:
      'Oversee finished goods warehouse operations, barcoded palletization, export container stuffing, and domestic port transit coordination.',
    responsibilities: [
      'Supervise finished goods storage, barcoded carton segregation, and palletizing.',
      'Direct container stuffing, weight distribution, and high-security seal verification.',
      'Coordinate domestic transport from manufacturing lines to container freight stations (CFS).',
      'Maintain real-time WMS inventory logs and pre-shipment staging records.',
    ],
    requirements: [
      'Proven experience in export warehouse operations or containerized freight handling.',
      'Hands-on knowledge of cargo loading safety protocols, carton drop-testing, and dispatch logistics.',
      'Detail-oriented approach with strong computer and dispatch logging abilities.',
    ],
  },
]

export default function CareerPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All')
  const [activeModalJob, setActiveModalJob] = useState<JobPosition | null>(null)
  const [activeDetailsJob, setActiveDetailsJob] = useState<JobPosition | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    experience: '',
    message: '',
  })

  const departments = ['All', ...Array.from(new Set(positions.map((p) => p.department)))]

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

          {/* Positions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPositions.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] uppercase tracking-wider border border-amber-200/70">
                      {job.department}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {job.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-[#0B1F3A] font-[Manrope] group-hover:text-amber-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-amber-600/90 font-bold uppercase tracking-wider mt-0.5">
                      {job.department}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveDetailsJob(job)}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-white text-slate-800 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer group/btn"
                  >
                    <TbEye size={15} className="text-amber-600 group-hover/btn:scale-110 transition-transform" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalJob(job)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 group-hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Click to Apply</span>
                    <TbArrowRight size={14} />
                  </button>
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

      {/* 4. JOB DETAILS SPECIFICATION MODAL */}
      <AnimatePresence>
        {activeDetailsJob && (
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
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {activeDetailsJob.department}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                      {activeDetailsJob.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-[Manrope] text-white">
                    {activeDetailsJob.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveDetailsJob(null)}
                  className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <TbX size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* Role Overview */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 mb-2">
                    Role Overview
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    {activeDetailsJob.description}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <TbCheck className="text-amber-500" size={16} />
                    <span>Key Responsibilities</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {activeDetailsJob.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-amber-200/60">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements & Qualifications */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <TbCertificate className="text-amber-500" size={16} />
                    <span>Requirements & Qualifications</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {activeDetailsJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-slate-200">
                          ✓
                        </span>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Perks & Culture highlight */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-2xl border border-amber-200/60 text-xs text-slate-700 flex items-start gap-3">
                  <TbSparkles className="text-amber-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="font-bold text-[#0B1F3A] block mb-0.5">ShivaSun Moderno Advantage</span>
                    <span>Direct involvement in global trade operations, competitive industry remuneration, and international brand partnerships across 35+ countries.</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveDetailsJob(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const job = activeDetailsJob
                    setActiveDetailsJob(null)
                    setActiveModalJob(job)
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply For This Position</span>
                  <TbArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. APPLICATION MODAL */}
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
