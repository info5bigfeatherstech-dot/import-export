import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi'
import { TbChevronDown, TbArrowRight } from 'react-icons/tb'
import { exportCategories } from '../data/categories'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Export Categories', href: '#products', hasDropdown: true },
  { label: 'Global Markets', href: '#export-markets' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3'
          : 'bg-[#0B1F3A]/95 backdrop-blur-sm border-b border-white/10 py-4'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="BritTrade Global Home"
        >
          <div className="w-10 h-10 rounded-lg bg-[#0F9D7A] flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-sm transition-transform duration-200 group-hover:scale-105">
            SM
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-[#0B1F3A]' : 'text-white'
              }`}
            >
              ShivaSun
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F9D7A]">
              Moderno
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1.5"
        >
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      scrolled
                        ? 'text-slate-600 hover:text-[#0F9D7A] hover:bg-slate-50'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{link.label}</span>
                    <TbChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180 text-[#0F9D7A]' : ''
                      }`}
                    />
                  </a>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[500px]"
                      >
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden p-3">
                          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0F9D7A] font-[Manrope]">
                              Export Categories (10 Sectors)
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">
                              Verified Trade Desks
                            </span>
                          </div>

                          {/* 2-Column Grid of 10 Categories */}
                          <div className="grid grid-cols-2 gap-1.5 p-1.5">
                            {exportCategories.map((cat) => {
                              const Icon = cat.icon
                              return (
                                <a
                                  key={cat.id}
                                  href={`#cat-${cat.id}`}
                                  onClick={() => setDropdownOpen(false)}
                                  className="group/item flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0F9D7A] flex items-center justify-center group-hover/item:bg-[#0F9D7A] group-hover/item:text-white transition-colors shrink-0 shadow-xs">
                                    <Icon size={16} />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-bold text-[#0B1F3A] group-hover/item:text-[#0F9D7A] transition-colors truncate font-[Manrope]">
                                      {cat.title}
                                    </span>
                                    <span className="text-[10px] text-slate-500 truncate">
                                      {cat.subtitle}
                                    </span>
                                  </div>
                                </a>
                              )
                            })}
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="pt-2 px-3 pb-1 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-3 -mb-3 p-3">
                            <span className="text-[11px] text-slate-600 font-medium">
                              Full UK & International certification
                            </span>
                            <a
                              href="#products"
                              onClick={() => setDropdownOpen(false)}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F9D7A] hover:text-[#0B7A5E] transition-colors"
                            >
                              <span>View All Sectors</span>
                              <TbArrowRight size={13} />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? 'text-slate-600 hover:text-[#0F9D7A] hover:bg-slate-50'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* CTA & Phone button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+442071234567"
            className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors ${
              scrolled ? 'text-slate-600 hover:text-[#0B1F3A]' : 'text-slate-300 hover:text-white'
            }`}
          >
            <HiPhone className="text-[#0F9D7A]" size={15} />
            <span>+44 (0)20 7123 4567</span>
          </a>
          <a
            href="#contact"
            id="nav-request-quote"
            className="px-5 py-2.5 bg-[#0F9D7A] hover:bg-[#0C7A60] text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-200 hover:shadow hover:-translate-y-0.5"
          >
            Request Quote
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
            scrolled ? 'text-[#0B1F3A] hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
        >
          {mobileOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-200 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <nav className="px-6 py-5 flex flex-col gap-1.5">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="flex flex-col">
                      <div className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <a
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="hover:text-[#0F9D7A]"
                        >
                          {link.label}
                        </a>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileCategoriesOpen(!mobileCategoriesOpen)
                          }
                          className="p-1 text-slate-400 hover:text-[#0F9D7A]"
                          aria-label="Toggle categories list"
                        >
                          <TbChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              mobileCategoriesOpen ? 'rotate-180 text-[#0F9D7A]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile categories sub-list */}
                      {mobileCategoriesOpen && (
                        <div className="pl-4 pr-2 py-2 grid grid-cols-1 gap-1 bg-slate-50 rounded-xl mb-2">
                          {exportCategories.map((cat) => {
                            const Icon = cat.icon
                            return (
                              <a
                                key={cat.id}
                                href={`#cat-${cat.id}`}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0F9D7A] rounded-lg hover:bg-white"
                              >
                                <Icon size={15} className="text-[#0F9D7A]" />
                                <span>{cat.title}</span>
                              </a>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F9D7A] transition-colors"
                  >
                    {link.label}
                  </a>
                )
              })}

              <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-3">
                <a
                  href="tel:+442071234567"
                  className="flex items-center justify-center gap-2 text-sm text-slate-600 font-semibold py-2"
                >
                  <HiPhone className="text-[#0F9D7A]" size={16} />
                  +44 (0)20 7123 4567
                </a>
                <a
                  href="#contact"
                  id="mobile-request-quote"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 bg-[#0F9D7A] text-white text-sm font-semibold rounded-lg text-center transition-colors hover:bg-[#0C7A60] shadow-sm"
                >
                  Request a Free Quote
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
