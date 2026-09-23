import { Link } from 'react-router-dom'
import {
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandFacebook,
  TbMail,
  TbPhone,
  TbMapPin,
  TbClock,
} from 'react-icons/tb'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About BritTrade', href: '#about' },
  { label: 'Export Categories', href: '#products' },
  { label: 'Trade Execution Process', href: '#process' },
  { label: 'Global Trade Footprint', href: '#markets' },
  { label: 'Sectors We Serve', href: '#industries' },
  { label: 'Client Testimonials', href: '#testimonials' },
  { label: 'Contact Trade Desk', href: '#contact' },
]

const exportCategories = [
  'Agriculture & Grains',
  'Textiles & British Wools',
  'Engineering & Machine Spares',
  'Food & Artisan Provisions',
  'Industrial & Fine Chemicals',
  'FMCG & Consumer Goods',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="w-full bg-[#07162A] text-white border-t border-[#142849]"
    >
      {/* Main footer grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Company Overview (4 cols) */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="flex items-center gap-3 mb-5 group"
              aria-label="BritTrade Global Home"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0F9D7A] flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow">
                BT
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  BritTrade
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F9D7A]">
                  Global UK
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A premier United Kingdom import & export enterprise connecting accredited British manufacturers and global trade suppliers with international commercial buyers across 35+ destination markets.
            </p>

            <div className="space-y-1 text-xs text-slate-400 mb-6">
              <p>Companies House Registration: <span className="text-slate-300 font-semibold">No. 09876543</span></p>
              <p>HMRC EORI Registration: <span className="text-slate-300 font-semibold">GB987654321000</span></p>
              <p>ISO 9001:2015 Accredited Quality Protocol</p>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3">
              {[
                { icon: TbBrandLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: TbBrandTwitter, href: 'https://twitter.com', label: 'Twitter/X' },
                { icon: TbBrandFacebook, href: 'https://facebook.com', label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${s.label}`}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-[#0F9D7A] hover:bg-[#0F9D7A]/10 text-slate-400 hover:text-[#0F9D7A] flex items-center justify-center transition-colors duration-200"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links (2.5 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold font-[Manrope] text-white mb-5 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-[#0F9D7A] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trading Sectors (2.5 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold font-[Manrope] text-white mb-5 uppercase tracking-wider">
              Export Desks
            </h3>
            <ul className="space-y-2.5">
              {exportCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#products"
                    className="text-sm text-slate-400 hover:text-[#0F9D7A] transition-colors"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold font-[Manrope] text-white mb-5 uppercase tracking-wider">
              UK Headquarters
            </h3>
            <address className="not-italic space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <TbMapPin className="text-[#0F9D7A] flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-white font-medium">BritTrade Global Ltd</p>
                  <p>12 Canary Wharf Business Centre</p>
                  <p>London, E14 5AB, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TbMail className="text-[#0F9D7A] flex-shrink-0" size={18} />
                <a
                  href="mailto:trade@brittradeglobal.co.uk"
                  className="hover:text-[#0F9D7A] transition-colors text-white"
                >
                  trade@brittradeglobal.co.uk
                </a>
              </div>

              <div className="flex items-center gap-3">
                <TbPhone className="text-[#0F9D7A] flex-shrink-0" size={18} />
                <a
                  href="tel:+442071234567"
                  className="hover:text-[#0F9D7A] transition-colors text-white"
                >
                  +44 (0)20 7123 4567
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
                <TbClock className="text-[#0F9D7A] flex-shrink-0" size={16} />
                <span>Trading Hours: Mon–Fri, 08:00–18:00 GMT</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#051120]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {year} BritTrade Global Ltd. All rights reserved. Registered in England & Wales.
          </p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Terms of Trade</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">EORI Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
