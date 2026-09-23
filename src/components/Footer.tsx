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
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Categories', href: '/#products' },
  { label: 'Inside Factories Gallery', href: '/#gallery' },
  { label: 'Career Opportunities', href: '/career', isRoute: true },
  { label: 'Contact Trade Desk', href: '/contact', isRoute: true },
]

const exportCategoriesList = [
  'Garments & Apparel',
  'Footwears',
  'Home-Textile',
  'Bags & Wallets',
  'Jewellery & Accessories',
  'Fabrics & Woven Textiles',
  'Tailoring Accessories & Trims',
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
              className="inline-block mb-6 group"
              aria-label="ShivaSun Moderno Impex Pvt. Ltd. Home"
            >
              <div className="bg-white px-3 py-2 rounded-2xl shadow-md inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-102">
                <img
                  src="/logo.png"
                  alt="ShivaSun Moderno Impex Pvt. Ltd."
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A dynamic import-export company specializing in comprehensive global trade services with a focus on Garments, Fabrics, Tailoring Accessories, Footwears, and bespoke sourcing per customer requirement.
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
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className="text-sm text-slate-400 hover:text-[#0F9D7A] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-[#0F9D7A] transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
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
              {exportCategoriesList.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/#products"
                    className="text-sm text-slate-400 hover:text-[#0F9D7A] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold font-[Manrope] text-white mb-5 uppercase tracking-wider">
              Trade Offices
            </h3>
            <address className="not-italic space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <TbMapPin className="text-[#0F9D7A] flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-white font-medium">ShivaSun Moderno Impex Pvt Ltd</p>
                  <p>12 Canary Wharf Business Centre</p>
                  <p>London, E14 5AB, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TbMail className="text-[#0F9D7A] flex-shrink-0" size={18} />
                <a
                  href="mailto:contact@shivasunmoderno.com"
                  className="hover:text-[#0F9D7A] transition-colors text-white"
                >
                  contact@shivasunmoderno.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <TbPhone className="text-[#0F9D7A] flex-shrink-0" size={18} />
                <a
                  href="tel:+917297960397"
                  className="hover:text-[#0F9D7A] transition-colors text-white"
                >
                  +91 72979 60397
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
            © {year} ShivaSun Moderno Impex Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Terms of Trade</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Quality Assurance</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
