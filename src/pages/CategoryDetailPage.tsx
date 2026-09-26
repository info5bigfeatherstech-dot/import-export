import { useState, useEffect } from 'react'
import { useParams, useLocation, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TbArrowRight,
  TbBuildingFactory2,
  TbShieldCheck,
  TbSparkles,
  TbCheck,
  TbWorld,
  TbPackage,
  TbFileCertificate,
  TbTools,
  TbClock,
  TbFilter,
  TbX,
} from 'react-icons/tb'
import { exportCategories } from '../data/categories'
import { categoryDetailsData } from '../data/categoryDetails'
import { navigationSubmenus } from '../data/navigationData'

export default function CategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId?: string }>()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  // Match category or fallback to first, also checking pathname
  let activeId = categoryId?.toLowerCase() || ''
  if (!activeId) {
    if (location.pathname.includes('garment-fabric')) activeId = 'fabric'
    else if (location.pathname.includes('home-textile-fabric')) activeId = 'fabric'
    else if (location.pathname.includes('garments')) activeId = 'garments'
    else if (location.pathname.includes('footwears')) activeId = 'footwears'
    else if (location.pathname.includes('fabric')) activeId = 'fabric'
    else activeId = 'garments'
  }

  const categoryMeta =
    exportCategories.find((c) => c.id.toLowerCase() === activeId) || exportCategories[0]
  const categoryDetail =
    categoryDetailsData[categoryMeta.id] || categoryDetailsData['garments']

  const ActiveIcon = categoryMeta.icon

  // Filter params
  let initialGroup = searchParams.get('group') || 'all'
  if (initialGroup === 'all') {
    if (location.pathname.includes('garment-fabric')) initialGroup = 'garment-fabric'
    else if (location.pathname.includes('home-textile-fabric')) initialGroup = 'home-textile-fabric'
  }
  const activeGroupParam = initialGroup
  const activeItemParam = searchParams.get('item') || ''

  // Selected gallery image for preview
  const [activeImage, setActiveImage] = useState<string>(categoryDetail.heroImage)

  // Submenu configuration for current category (if available)
  const navSubmenu = navigationSubmenus[categoryMeta.id]

  // Auto-scroll to product lines if group or item filter is passed in URL
  useEffect(() => {
    if (searchParams.get('group') || searchParams.get('item')) {
      const el = document.getElementById('product-lines')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
  }, [searchParams])

  // Filtered product lines
  const filteredProducts = categoryDetail.productLines.filter((prod) => {
    if (activeGroupParam !== 'all' && prod.group && prod.group !== activeGroupParam) {
      return false
    }
    if (activeItemParam && prod.itemKey && prod.itemKey !== activeItemParam) {
      return false
    }
    return true
  })

  // Set group filter handler
  const handleGroupSelect = (groupId: string) => {
    const newParams = new URLSearchParams()
    if (groupId !== 'all') {
      newParams.set('group', groupId)
    }
    setSearchParams(newParams)
  }

  // Set item filter handler
  const handleItemSelect = (groupId: string, itemKey: string) => {
    const newParams = new URLSearchParams()
    if (groupId && groupId !== 'all') {
      newParams.set('group', groupId)
    }
    if (itemKey) {
      newParams.set('item', itemKey)
    }
    setSearchParams(newParams)
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }



  return (
    <div className="w-full bg-[#FAFCFF] min-h-screen text-[#1F2937]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#0B1F3A] text-white pt-28 sm:pt-36 lg:pt-40 pb-20 overflow-hidden border-b border-slate-800">
        {/* Ambient Warm Golden & Navy Ambient Lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-navy-light/30 rounded-full blur-3xl pointer-events-none -ml-32 -mb-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          {/* <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
            <Link to="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <TbChevronRight size={12} className="text-slate-600" />
            <Link to="/#products" className="hover:text-amber-400 transition-colors">
              Export Categories
            </Link>
            <TbChevronRight size={12} className="text-slate-600" />
            <span className="text-amber-400 font-semibold">{categoryMeta.title}</span>
          </nav> */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-5">
                {/* <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> */}
                <span>ARCH {categoryMeta.number} • GLOBAL INDUSTRY LINE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5 font-[Manrope]">
                {categoryDetail.title}
              </h1>

              <p className="text-amber-300/90 text-sm sm:text-base font-semibold tracking-wide uppercase font-[Manrope] mb-4">
                {categoryDetail.subtitle}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl font-[Inter]">
                {categoryDetail.overview}
              </p>


              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all duration-200"
                >
                  <span>Request Commercial RFQ</span>
                  <TbArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Arch Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Outer Glow Halo */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 to-yellow-300/20 rounded-t-[120px] rounded-b-3xl blur-md" />

                {/* Main Architectural Card */}
                <div className="relative bg-white/5 border border-white/15 backdrop-blur-md rounded-t-[115px] rounded-b-3xl p-3 shadow-2xl overflow-hidden">
                  <div className="relative w-full aspect-[4/3.8] rounded-t-[105px] rounded-b-2xl overflow-hidden bg-slate-900 border border-white/10">
                    <img
                      src={activeImage}
                      alt={categoryDetail.title}
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block">
                          Verified Export Facility
                        </span>
                        <span className="text-base font-bold font-[Manrope] drop-shadow-md">
                          ShivaSun Moderno Impex
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center backdrop-blur-md">
                        <ActiveIcon size={22} />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="grid grid-cols-4 gap-2 pt-3">
                    {categoryDetail.galleryImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                          activeImage === img
                            ? 'border-amber-400 shadow-md scale-102'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${categoryDetail.shortTitle} thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. CORE TRADE METRICS / SPECIFICATION STRIP */}
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-5 sm:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <TbBuildingFactory2 size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Monthly Capacity
              </span>
            </div>
            <div className="text-sm font-extrabold text-[#0B1F3A] font-[Manrope]">
              {categoryDetail.stats.monthlyCapacity}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <TbPackage size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Standard MOQ
              </span>
            </div>
            <div className="text-sm font-extrabold text-[#0B1F3A] font-[Manrope]">
              {categoryDetail.stats.moq}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <TbClock size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Production Lead Time
              </span>
            </div>
            <div className="text-sm font-extrabold text-[#0B1F3A] font-[Manrope]">
              {categoryDetail.stats.leadTime}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <TbFileCertificate size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Audits & Compliance
              </span>
            </div>
            <div className="text-xs font-bold text-[#0B1F3A] font-[Manrope] line-clamp-1">
              {categoryDetail.stats.certifications}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <TbWorld size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Primary Markets
              </span>
            </div>
            <div className="text-xs font-bold text-[#0B1F3A] font-[Manrope] line-clamp-1">
              {categoryDetail.stats.primaryMarkets}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <TbShieldCheck size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                Inspection Standard
              </span>
            </div>
            <div className="text-xs font-bold text-[#0B1F3A] font-[Manrope] line-clamp-1">
              {categoryDetail.stats.inspectionLevel}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT LINES & SUB-CATEGORIES SHOWCASE */}
      <section id="product-lines" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400" />
            <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase font-[Manrope]">
              Verified Product Specifications
            </p>
            <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-yellow-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight mb-4">
            {categoryDetail.shortTitle} Export Product Lines
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every product line is manufactured to client technical spec sheets, with complete lab testing, custom packaging, and flexible order runs.
          </p>
        </div>

        {/* Subcategory Group & Item Filter Controls */}
        {navSubmenu && navSubmenu.groups && (
          <div className="mb-10 space-y-4">
            {/* Primary Group Tabs (All, Men, Women, Youth) */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl max-w-fit mx-auto border border-slate-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => handleGroupSelect('all')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeGroupParam === 'all'
                    ? 'bg-[#0B1F3A] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                All {categoryDetail.shortTitle} ({categoryDetail.productLines.length})
              </button>

              {navSubmenu.groups.map((group) => {
                const count = categoryDetail.productLines.filter(
                  (p) => p.group === group.id
                ).length
                const isActive = activeGroupParam === group.id

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleGroupSelect(group.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <span>{group.title}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950'
                          : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Secondary Sub-Category Item Chips */}
            {activeGroupParam !== 'all' && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto pt-1">
                {navSubmenu.groups
                  .find((g) => g.id === activeGroupParam)
                  ?.items.map((sub) => {
                    const isSubActive = activeItemParam === sub.id
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() =>
                          isSubActive
                            ? handleGroupSelect(activeGroupParam)
                            : handleItemSelect(activeGroupParam, sub.id)
                        }
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                          isSubActive
                            ? 'bg-amber-100/90 text-amber-900 border-amber-400 shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200/90 hover:border-amber-300 hover:text-amber-700'
                        }`}
                      >
                        {sub.name}
                        {isSubActive && <span className="ml-1 font-bold">✓</span>}
                      </button>
                    )
                  })}
              </div>
            )}

            {/* Active Filter Notification Bar */}
            {(activeGroupParam !== 'all' || activeItemParam) && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-700 font-medium">
                    Filtered by{' '}
                    <span className="font-bold text-amber-800">
                      {navSubmenu?.groups?.find((g) => g.id === activeGroupParam)?.title ||
                        activeGroupParam}
                      {activeItemParam ? ` • ${activeItemParam.replace(/-/g, ' ')}` : ''}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {activeItemParam && (
                    <Link
                      to={`/products/${activeItemParam}`}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <span>Open Dedicated Product Catalog</span>
                      <TbArrowRight size={13} />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold underline underline-offset-2"
                  >
                    <TbX size={13} />
                    <span>Reset All</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => {
              const isHighlighted = prod.itemKey && prod.itemKey === activeItemParam

              return (
                <motion.article
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group ${
                    isHighlighted
                      ? 'border-amber-400 ring-2 ring-amber-400/80 shadow-xl shadow-amber-500/10'
                      : 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/50'
                  }`}
                >
                  <div>
                    {/* Visual Image Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {isHighlighted && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1">
                          <TbSparkles size={12} />
                          <span>Active Selection</span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                          {prod.subtitle}
                        </span>
                        <h3 className="text-lg font-bold font-[Manrope] leading-tight">
                          {prod.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Quick Spec Badges */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">
                            MOQ
                          </span>
                          <span className="font-semibold text-slate-800">{prod.moq}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">
                            Lead Time
                          </span>
                          <span className="font-semibold text-slate-800">{prod.leadTime}</span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="text-slate-500 font-medium">Specifications:</div>
                        <div className="font-semibold text-slate-800 leading-snug">{prod.specs}</div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="text-slate-500 font-medium">Materials & Composition:</div>
                        <div className="font-semibold text-slate-800 leading-snug">{prod.materials}</div>
                      </div>

                      {/* Bullet Highlights */}
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        {prod.highlights.map((h, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <TbCheck size={14} className="text-amber-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Inquire Action */}
                  <div className="p-4 sm:p-5 pt-0 flex gap-2">
                    {prod.itemKey && (
                      <Link
                        to={`/products/${prod.itemKey}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors duration-200"
                      >
                        <span>View Styles</span>
                        <TbArrowRight size={13} />
                      </Link>
                    )}
                    <Link
                      to={`/contact?item=${encodeURIComponent(prod.name)}`}
                      className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-400 text-slate-800 hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors duration-200 ${
                        prod.itemKey ? 'flex-1' : 'w-full'
                      }`}
                    >
                      <span>Inquire</span>
                      <TbArrowRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300 max-w-lg mx-auto">
            <TbFilter size={32} className="mx-auto text-slate-400 mb-3" />
            <h4 className="text-base font-bold text-slate-800 mb-1">No products match this filter</h4>
            <p className="text-xs text-slate-500 mb-4">
              Try selecting another collection or view all product lines.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. MANUFACTURING INFRASTRUCTURE & CAPABILITIES */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
                Industrial Strength & Automation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-[Manrope] tracking-tight leading-tight">
                Engineering & Production Standards
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We invest in automated cutting, state-of-the-art tooling, computerized quality control loops, and zero-defect packaging protocols to guarantee seamless container dispatch.
              </p>

              <div className="pt-2 space-y-3">
                <div className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                  Quality Assurance Standards:
                </div>
                {categoryDetail.qualityStandards.map((std, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <TbShieldCheck size={13} />
                    </div>
                    <span>{std}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Highlights Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {categoryDetail.manufacturingHighlights.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <TbTools size={20} />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] font-[Manrope] mb-2 leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed capitalize
                  ">
                    {feat.desc}
                  </p>
                </div>
              ))}

              {/* Customization Card */}
              <div className="p-6 rounded-2xl bg-[#0B1F3A] text-white border border-slate-700 shadow-sm col-span-1 sm:col-span-2">
                <div className="flex items-center gap-2 text-amber-400 mb-3">
                  <TbSparkles size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider font-[Manrope]">
                    OEM & ODM Customization Scope
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  {categoryDetail.customizationOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-amber-400">✓</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PACKAGING, SHIPPING & EXPORT LOGISTICS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Export Logistics & Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-[Manrope] mt-1 mb-3">
              Packaging & Multimodal Freight Options
            </h2>
            <p className="text-slate-600 text-sm">
              We ensure seaworthy packaging, moisture barrier protection, barcode tracking, and verified port of loading options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categoryDetail.packagingLogistics.map((log, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B1F3A] flex items-center justify-center mb-4">
                  <TbPackage size={20} className="text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] font-[Manrope] mb-2">
                  {log.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {log.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  )
}
