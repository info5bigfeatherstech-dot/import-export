import { useState } from 'react'
import {
  TbMail,
  TbPhone,
  TbCheck,
  TbSend,
  TbBuildingSkyscraper,
  TbBuildingFactory,
} from 'react-icons/tb'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: 'Garments & Ready-to-Wear',
    destination: '',
    volume: 'Trial / Sampling Batch',
    incoterm: 'FOB (Free on Board)',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B1F3A] text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Direct Trade Desk & Inquiries
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-[Manrope] tracking-tight leading-tight mb-6">
            Let’s Discuss Your Next <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Global Consignment</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Connect directly with the trade specialists at <strong>ShivaSun Moderno Impex Private Limited</strong>. Whether you need immediate apparel production, bulk fabrics, trims, or bespoke product sourcing, our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT & INQUIRY FORM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Desks (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-[#0B1F3A] font-[Manrope]">
                International Trade Desks
              </h2>

              <div className="space-y-4">
                <a
                  href="tel:+917297960397"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-400/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <TbPhone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Commercial Desk Phone
                    </div>
                    <div className="text-sm font-bold text-[#0B1F3A] group-hover:text-amber-600 transition-colors">
                      +91 72979 60397
                    </div>
                    <div className="text-[11px] text-slate-500">Mon - Fri: 8:00 AM - 7:00 PM GMT</div>
                  </div>
                </a>

                <a
                  href="mailto:contact@shivasunmoderno.com"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-400/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <TbMail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Official Trade Email
                    </div>
                    <div className="text-sm font-bold text-[#0B1F3A] group-hover:text-amber-600 transition-colors">
                      contact@shivasunmoderno.com
                    </div>
                    <div className="text-[11px] text-slate-500">Guaranteed response within 24 hours</div>
                  </div>
                </a>

                {/* <a
                  href="https://wa.me/917297960397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 hover:bg-amber-100/60 border border-amber-200/80 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <TbMessageCircle size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      WhatsApp Quick Chat
                    </div>
                    <div className="text-sm font-bold text-[#0B1F3A]">
                      Direct WhatsApp Procurement
                    </div>
                    <div className="text-[11px] text-slate-600">Immediate swatch & catalog exchange</div>
                  </div>
                </a> */}
              </div>

              {/* Office Locations */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                    <TbBuildingSkyscraper size={16} />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#0B1F3A]">United Kingdom Representative Office</div>
                    <div className="text-slate-500">Canary Wharf Financial District, London E14 5AB, United Kingdom</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0B1F3A] flex items-center justify-center shrink-0 mt-0.5">
                    <TbBuildingFactory size={16} />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#0B1F3A]">Corporate & Registered Office (India)</div>
                    <div className="text-slate-500">Office No. 4, 2nd Floor, Building No. 8577, New Rohtak Road, Near Jain Indian Oil Petrol Pump, Karol Bagh, New Delhi 110005, INDIA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Trust Banner */}
            {/* <div className="bg-[#0B1F3A] text-white rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
                <TbShieldCheck size={18} />
                <span>Our Quality Commitment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Quality is our top priority. We ensure that all products meet stringent quality standards, guaranteeing excellence in every shipment."
              </p>
            </div> */}
          </div>

          {/* Right Column: Interactive Commercial Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="py-14 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl shadow-inner">
                  <TbCheck size={36} />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0B1F3A] font-[Manrope]">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for contacting <strong>ShivaSun Moderno Impex Private Limited</strong>. Your dedicated trade account executive will review your specifications and supply a formal quotation within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        product: 'Garments & Ready-to-Wear',
                        destination: '',
                        volume: 'Trial / Sampling Batch',
                        incoterm: 'FOB (Free on Board)',
                        message: '',
                      })
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0B1F3A] font-[Manrope]">
                    Request a Quotation or Sourcing Consultation
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Fill out the commercial details below to receive competitive pricing, fabric swatches, and logistics timelines.
                  </p>
                </div>

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
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Modern Retailers Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="procurement@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone / WhatsApp Number *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Product Focus / Category *
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Garments & Ready-to-Wear">Garments & Ready-to-Wear</option>
                      <option value="Fabrics & Textiles">Fabrics & Textiles</option>
                      <option value="Tailoring Accessories & Trims">Tailoring Accessories & Trims</option>
                      <option value="Footwears">Footwears</option>
                      <option value="Any product as per customer requirement">Bespoke Product (As Per Customer Requirement)</option>
                      <option value="General Trade Partnership">General Trade Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Destination Country / Port of Discharge
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Southampton, UK / Rotterdam / New York"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Volume
                    </label>
                    <select
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Trial / Sampling Batch">Trial / Sampling Batch (300 - 1,000 pcs)</option>
                      <option value="Commercial Medium (1,000 - 5,000 pcs)">Commercial Medium (1,000 - 5,000 pcs)</option>
                      <option value="High Volume (5,000 - 25,000 pcs)">High Volume (5,000 - 25,000 pcs)</option>
                      <option value="Full Container Load (FCL)">Full Container Load (FCL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Shipping Terms (Incoterms)
                    </label>
                    <select
                      value={formData.incoterm}
                      onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="FOB (Free on Board)">FOB (Free on Board)</option>
                      <option value="CIF (Cost, Insurance & Freight)">CIF (Cost, Insurance & Freight)</option>
                      <option value="DDP (Delivered Duty Paid)">DDP (Delivered Duty Paid)</option>
                      <option value="Ex-Factory (EXW)">Ex-Factory (EXW)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Order Details, Fabric Specs, or Special Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify fabric types, GSM, sizing ratios, trim types, target shipment date, or custom instructions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <TbSend size={16} />
                    <span>Send Commercial Inquiry & Request Quotation</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Your details are protected under NDA. We never share commercial information with third parties.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
