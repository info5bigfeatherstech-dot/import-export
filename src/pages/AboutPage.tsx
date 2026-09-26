import { Link } from 'react-router-dom'
import {
  TbShirt,
  TbLayersDifference,
  TbScissors,
  TbShoe,
  TbSparkles,
  TbShieldCheck,
  TbTruckDelivery,
  TbCheck,
  TbArrowRight,
  TbBuildingStore,
  TbBuildingFactory,
  TbBuildingWarehouse,
  TbAward,
  TbFileCertificate,
  TbHeartHandshake,
} from 'react-icons/tb'

export default function AboutPage() {
  const focusSectors = [
    {
      id: 'garments',
      icon: TbShirt,
      title: 'Garments & Apparel',
      tag: 'Core Specialization',
      image: '/factory_floor.jpg',
      description:
        'Ready-to-wear apparel across men’s, women’s, and unisex fashion—from casual everyday essentials to high-end denim programs, tailored workwear, and uniforms.',
      features: ['Men’s & Women’s Ready-to-Wear', 'Denim & Casual Collections', 'Activewear & Uniforms', 'Strict International Fit Specs'],
    },
    {
      id: 'fabrics',
      icon: TbLayersDifference,
      title: 'Fabrics & Textiles',
      tag: 'Raw Material Sourcing',
      image: '/cat_textiles_1790144411477.jpg',
      description:
        'Sourcing premium woven and knitted textiles including high-grade denim, cotton twills, linen blends, synthetics, and technical performance fabrics.',
      features: ['Woven & Knitted Substrates', 'Sustainable & Organic Cottons', 'Dyed & Printed Textiles', 'Lab-Tested Colorfastness'],
    },
    {
      id: 'accessories',
      icon: TbScissors,
      title: 'Tailoring Accessories',
      tag: 'Garment Trims',
      image: '/cat_consumer_1790144498461.jpg',
      description:
        'Complete range of garment manufacturing trims—premium brass and nylon zippers, bespoke metal buttons, custom woven labels, drawcords, and interlinings.',
      features: ['Zippers & Sliders', 'Custom Woven & Leather Labels', 'Buttons, Rivets & Eyelets', 'Interlinings & Sewing Threads'],
    },
    {
      id: 'footwears',
      icon: TbShoe,
      title: 'Footwears',
      tag: 'Global Footwear Line',
      image: '/ind_retail_1790144526101.jpg',
      description:
        'High-durability lifestyle footwear, casual vulcanized sneakers, athletic trainers, formal leather dress shoes, and certified safety boots.',
      features: ['Casual Sneakers & Trainers', 'Genuine Leather Dress Shoes', 'Safety & Industrial Work Boots', 'Comfort Ergonomic Insoles'],
    },
    {
      id: 'custom-sourcing',
      icon: TbSparkles,
      title: 'Bespoke Sourcing',
      tag: 'As Per Customer Requirement',
      image: '/ind_manufacturing_1790144594818.jpg',
      description:
        'Tailored sourcing solutions for any product as per your exact customer specifications, CAD drawings, fabric GSM targets, or custom packaging requirements.',
      features: ['100% Custom Product Sourcing', 'OEM / ODM Brand Programs', 'Custom Packaging & Barcoding', 'Rapid Prototyping & Sampling'],
    },
  ]

  const qaPillars = [
    {
      icon: TbFileCertificate,
      title: 'Material & Fiber Testing',
      desc: 'Yarn count verification, tensile strength, shrinkage testing, and international colorfastness benchmarks before cutting begins.',
    },
    {
      icon: TbShieldCheck,
      title: 'In-Line Factory Audits',
      desc: 'Trained QC teams stationed in partner factories monitor stitch accuracy, seam strength, symmetry, and dimensional stability daily.',
    },
    {
      icon: TbAward,
      title: 'Pre-Shipment Inspection (AQL 2.5)',
      desc: 'Rigorous 100% carton inspection and random AQL statistical sampling ensuring zero defective lots leave the loading dock.',
    },
    {
      icon: TbTruckDelivery,
      title: 'Sealed Multimodal Logistics',
      desc: 'Full documentation trail, customs compliance (EORI & HS Code mapping), moisture-controlled containerization, and real-time tracking.',
    },
  ]

  const clientTypes = [
    {
      icon: TbBuildingStore,
      role: 'Fashion Retailers',
      desc: 'Delivering trendy, shelf-ready collections with quick turnaround, attractive margins, and customized branding.',
      benefit: 'Low MOQ pilot batches & seasonal forecast support',
    },
    {
      icon: TbBuildingFactory,
      role: 'Garment Manufacturers',
      desc: 'Supplying bulk fabrics, yarn-dyed textiles, and certified tailoring accessories to fuel production lines smoothly.',
      benefit: 'Consistent raw material quality with zero factory downtime',
    },
    {
      icon: TbBuildingWarehouse,
      role: 'Textile Distributors',
      desc: 'Reliable container-load supplies of certified textiles and apparel lines across multiple wholesale markets.',
      benefit: 'Volume-based tiered pricing & prioritized vessel bookings',
    },
  ]

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B1F3A] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy-light/60 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-[10px] sm:text- font-bold uppercase tracking-wider sm:tracking-widest mb-6">
              {/* <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> */}
              About ShivaSun Moderno Impex Private Limited
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-[Manrope] tracking-tight leading-tight mb-6">
              Your One-Stop Solution for Global Trade in{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Garments, Fabrics & Accessories</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-base leading-relaxed mb-8 capitalize">
              At <strong className="text-white">ShivaSun Moderno Impex Private Limited</strong>, we are a dynamic import-export company specializing in providing comprehensive import-export services with a focus on Garments, Fabrics, Tailoring Accessories, Footwears, and any product as per customer requirement.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all duration-200"
              >
                <span>Connect With Our Trade Desk</span>
                <TbArrowRight size={16} />
              </Link>
              <a
                href="#qa"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all duration-200"
              >
                <span>Quality Assurance</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Manrope]">35+</div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Export Destination Countries</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-[Manrope]">100%</div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Strict Quality Audits</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Manrope]">500+</div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Commercial Shipments</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-[Manrope]">AQL 2.5</div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Standard Inspection Protocol</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE OVERVIEW STATEMENT */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600">
                <span>—— Company Overview</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight leading-snug">
                Committed to Helping Businesses Worldwide Access High-Quality Products
              </h2>
              <p className="text-slate-600 text-base leading-relaxed capitalize">
                At <strong className="text-[#0B1F3A]">ShivaSun Moderno Impex Private Limited</strong>, we are committed to helping businesses worldwide access high-quality products and materials efficiently and cost-effectively. We bridge the gap between accredited industrial mills, expert textile artisans, and commercial buyers across the globe.
              </p>
              <p className="text-slate-600 text-base leading-relaxed capitalize">
                Whether you need specialized denim wash developments, bulk export-grade cotton fabrics, high-durability tailoring notions, or customized footwear lines, our experienced merchandising and logistics team handles the end-to-end process with total transparency.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <TbCheck size={13} />
                  </div>
                  <span>Transparent FOB & CIF Terms</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <TbCheck size={13} />
                  </div>
                  <span>Cost-Effective Supply Sourcing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <TbCheck size={13} />
                  </div>
                  <span>Rapid Sample Turnaround</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <TbCheck size={13} />
                  </div>
                  <span>Full Customs & Duty Guidance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
                <img
                  src="/hero_port_1790144384015.jpg"
                  alt="Global Freight and Shipping by ShivaSun Moderno Impex"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white">
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                      International Multimodal Hub
                    </div>
                    <div className="text-base sm:text-lg font-bold font-[Manrope]">
                      Connecting Manufacturing Centers with Global Destination Ports
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-slate-100 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <TbHeartHandshake size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1F3A]">Trusted Trade Ally</div>
                    <div className="text-[11px] text-slate-500">Dedicated desk for every client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FOCUS SECTORS */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Our Core Specializations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight mt-2 mb-4">
              Comprehensive Focus Across Garments, Textiles & Beyond
            </h2>
            <p className="text-slate-600 text-sm sm:text-base capitalize">
              With a deep focus on Garments, Fabrics, Tailoring Accessories, Footwears, and bespoke products crafted to customer specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {focusSectors.map((sector) => {
              const Icon = sector.icon
              return (
                <div
                  key={sector.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sector.image}
                      alt={sector.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#0B1F3A] uppercase tracking-wider shadow-sm">
                        {sector.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md font-bold">
                      <Icon size={20} />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B1F3A] font-[Manrope] mb-2 group-hover:text-amber-600 transition-colors">
                        {sector.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 capitalize">
                        {sector.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                        {sector.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. QUALITY ASSURANCE SECTION */}
      <section id="qa" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest">
                <TbShieldCheck size={15} />
                Quality Assurance
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight leading-tight">
                Quality Is Our Top Priority
              </h2>

              <p className="text-slate-600 text-base leading-relaxed capitalize">
                Quality is our top priority. We ensure that all products meet stringent quality standards, guaranteeing excellence in every shipment. From laboratory fiber verification to post-packing carton audits, our rigorous protocols guarantee zero compromise on build, finish, and safety.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-sm text-slate-700 space-y-2">
                <div className="font-bold text-[#0B1F3A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  AQL 2.5 Standard Guarantee
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every export consignment is verified against accepted quality limits before final release, ensuring your goods arrive shelf-ready and defect-free.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
              >
                <span>Request Quality Inspection Protocol PDF</span>
                <TbArrowRight size={14} />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qaPillars.map((pillar, idx) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-400/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-amber-500 flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-[#0B1F3A] font-[Manrope] mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed capitalize">
                      {pillar.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO WE SERVE: YOUR TRUSTED ALLY */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Your Trusted Ally
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight mt-2 mb-4">
              Navigating the Global Marketplace Together
            </h2>
            <p className="text-slate-600 text-sm sm:text-base capitalize">
              Whether you’re a fashion retailer, garment manufacturer, or textile distributor, <strong className="text-[#0B1F3A]">ShivaSun Moderno Impex Private Limited</strong> is your trusted ally in navigating the global marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientTypes.map((client, idx) => {
              const Icon = client.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B1F3A] font-[Manrope] mb-3">
                      {client.role}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 capitalize">
                      {client.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Advantage
                    </span>
                    <span className="text-xs font-semibold text-amber-600">
                      {client.benefit}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0D284C] to-[#0B1F3A] text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Start Your Trade Partnership
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-[Manrope] tracking-tight mt-2 mb-4">
              Welcome to ShivaSun Moderno Impex Private Limited
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Your One-Stop Solution for Global Trade in Garments, Fabrics, and Tailoring Accessories! Connect with our trade specialists today for competitive volume quotes and certified shipment options.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all"
              >
                Inquire For Your Sourcing Needs
              </Link>
              <Link
                to="/career"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                Join Our Team (Careers)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
