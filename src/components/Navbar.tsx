import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi'
import { TbChevronDown } from 'react-icons/tb'
import { exportCategories } from '../data/categories'

const navLinks = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Categories', href: '/#products', hasDropdown: true },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Career', href: '/career', isRoute: true },
  { label: 'Contact Us', href: '/contact', isRoute: true },
]

export default function Navbar() {
  const location = useLocation()
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/70 ${scrolled ? 'shadow-sm py-2.5' : 'py-3.5'
        }`}
    >
      {/* Top golden-yellow sun gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group py-0.5"
          aria-label="ShivaSun Moderno Impex Pvt. Ltd. Home"
        >
          <img
            src="/logo.png"
            alt="ShivaSun Moderno Impex Pvt. Ltd."
            className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1.5"
        >
          {navLinks.map((link) => {
            const isActive =
              link.isRoute &&
              (link.href === '/'
                ? location.pathname === '/'
                : location.pathname === link.href)

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to="/#products"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <TbChevronDown
                      size={14}
                      className={`text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-500' : ''
                        }`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[440px]"
                      >
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden p-2.5">
                          {/* 2-Column Grid of 10 Categories */}
                          <div className="grid grid-cols-2 gap-1">
                            {exportCategories.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/industry/${cat.id}`}
                                onClick={() => setDropdownOpen(false)}
                                className="group/item flex items-center px-3.5 py-2.5 rounded-xl hover:bg-amber-50/70 transition-colors"
                              >
                                <span className="text-xs sm:text-[13px] font-medium text-slate-800 group-hover/item:text-amber-600 transition-colors truncate font-[Inter]">
                                  {cat.title}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            if (link.isRoute) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                      ? 'text-amber-700 font-bold bg-amber-50/90 ring-1 ring-amber-200/60'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50/60'
                    }`}
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* CTA & Phone button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+917297960397"
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-700 hover:text-amber-600 transition-colors"
          >
            <HiPhone className="text-amber-500" size={15} />
            <span>+91 72979 60397</span>
          </a>
          <Link
            to="/contact"
            id="nav-request-quote"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 text-sm font-bold rounded-lg shadow-sm shadow-amber-400/30 transition-all duration-200 hover:shadow hover:-translate-y-0.5"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
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
                      <div className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50/50">
                        <Link
                          to="/#products"
                          onClick={() => setMobileOpen(false)}
                          className="hover:text-amber-600"
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileCategoriesOpen(!mobileCategoriesOpen)
                          }
                          className="p-1 text-slate-400 hover:text-amber-600"
                          aria-label="Toggle categories list"
                        >
                          <TbChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180 text-amber-500' : ''
                              }`}
                          />
                        </button>
                      </div>

                      {/* Mobile categories sub-list */}
                      {mobileCategoriesOpen && (
                        <div className="pl-4 pr-2 py-2 grid grid-cols-1 gap-1 bg-slate-50 rounded-xl mb-2">
                          {exportCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/industry/${cat.id}`}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-xs font-medium text-slate-700 hover:text-amber-600 rounded-lg hover:bg-white transition-colors"
                            >
                              <span>{cat.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                const isActive =
                  link.isRoute &&
                  (link.href === '/'
                    ? location.pathname === '/'
                    : location.pathname === link.href)

                if (link.isRoute) {
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                          ? 'bg-amber-50 text-amber-700 font-bold border-l-2 border-amber-500'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-amber-600'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              })}

              <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-3">
                <a
                  href="tel:+917297960397"
                  className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-amber-600 font-semibold py-2"
                >
                  <HiPhone className="text-amber-500" size={16} />
                  +91 72979 60397
                </a>
                <Link
                  to="/contact"
                  id="mobile-request-quote"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 text-sm font-bold rounded-lg text-center transition-colors shadow-sm shadow-amber-400/30 block"
                >
                  Request a Free Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
