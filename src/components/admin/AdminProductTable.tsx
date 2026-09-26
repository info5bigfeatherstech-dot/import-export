import { useState, Fragment } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import {
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiStar,
  FiFilter,
  FiArrowUp,
  FiArrowDown,
  FiLayers,
  FiChevronDown,
  FiChevronRight,
  FiSliders,
} from 'react-icons/fi'
import type { AdminProduct } from '../../types/adminProduct'
import { calculateMargin } from '../../utils/adminStorage'

interface AdminProductTableProps {
  products: AdminProduct[]
  onView: (product: AdminProduct) => void
  onEdit: (product: AdminProduct) => void
  onDuplicate: (product: AdminProduct) => void
  onDelete: (id: string) => void
  selectedIds: string[]
  setSelectedIds: Dispatch<SetStateAction<string[]>>
}

export default function AdminProductTable({
  products,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
  selectedIds,
  setSelectedIds,
}: AdminProductTableProps) {
  const [sortField, setSortField] = useState<keyof AdminProduct>('productCode')
  const [sortAsc, setSortAsc] = useState(true)

  // Quick Filter state
  const [filterType, setFilterType] = useState<string>('ALL')
  const [filterCategory, setFilterCategory] = useState<string>('ALL')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [filterReadyStock, setFilterReadyStock] = useState<string>('ALL')

  // Expanded rows
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([])

  // Density: 'comfortable' vs 'compact'
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')

  // Column visibility
  const [showColumnMenu, setShowColumnMenu] = useState(false)
  const [showSpecs, setShowSpecs] = useState(true)
  const [showSourcing, setShowSourcing] = useState(true)
  const [showPricing, setShowPricing] = useState(true)
  const [showStock, setShowStock] = useState(true)

  // Categories list
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean)

  const toggleRowExpand = (id: string) => {
    setExpandedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map((p) => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSort = (field: keyof AdminProduct) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  // Filter logic
  const filteredProducts = products.filter((p) => {
    if (filterType !== 'ALL' && p.productType !== filterType) return false
    if (filterCategory !== 'ALL' && p.category !== filterCategory) return false
    if (filterStatus !== 'ALL' && p.productStatus !== filterStatus) return false
    if (filterReadyStock !== 'ALL' && p.readyStockAvailability !== filterReadyStock) return false
    return true
  })

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valA = a[sortField] || ''
    let valB = b[sortField] || ''
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return sortAsc ? -1 : 1
    if (valA > valB) return sortAsc ? 1 : -1
    return 0
  })

  // Count active visible columns for colSpan
  const visibleColCount =
    3 + // Checkbox, Product, Actions
    (showSpecs ? 1 : 0) +
    (showSourcing ? 1 : 0) +
    (showPricing ? 1 : 0) +
    (showStock ? 1 : 0)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm w-full">
      {/* Top Filter & Adjustability Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
        {/* Left: Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setFilterType('ALL')
              setFilterStatus('ALL')
              setFilterReadyStock('ALL')
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              filterType === 'ALL' && filterStatus === 'ALL' && filterReadyStock === 'ALL'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>

          <button
            onClick={() => setFilterReadyStock(filterReadyStock === 'Yes' ? 'ALL' : 'Yes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
              filterReadyStock === 'Yes'
                ? 'bg-navy/10 text-navy border-navy/30'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            Ready Stock
          </button>

          <button
            onClick={() => setFilterType(filterType === 'New Developed' ? 'ALL' : 'New Developed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
              filterType === 'New Developed'
                ? 'bg-navy/10 text-navy border-navy/30'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            New Developed
          </button>

          <button
            onClick={() => setFilterStatus(filterStatus === 'Active' ? 'ALL' : 'Active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
              filterStatus === 'Active'
                ? 'bg-navy/10 text-navy border-navy/30'
                : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
            }`}
          >
            Active Catalog
          </button>
        </div>

        {/* Right: Adjustability Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <FiFilter size={13} className="text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 outline-none focus:border-navy focus:bg-white"
            >
              <option value="ALL">All Categories</option>
              {uniqueCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Density Switch */}
          <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => setDensity('comfortable')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                density === 'comfortable'
                  ? 'bg-white text-navy font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Roomy
            </button>
            <button
              onClick={() => setDensity('compact')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                density === 'compact'
                  ? 'bg-white text-navy font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compact
            </button>
          </div>

          {/* Adjust Columns Toggle Menu */}
          <div className="relative">
            <button
              onClick={() => setShowColumnMenu(!showColumnMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-navy/40 text-slate-700 text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              <FiSliders size={13} className="text-navy" />
              <span>Adjust Columns</span>
              <FiChevronDown size={12} className="text-slate-400" />
            </button>

            {showColumnMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-40 space-y-2 text-xs">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Show / Hide Columns
                </div>
                <label className="flex items-center justify-between hover:bg-slate-50 p-1 rounded cursor-pointer">
                  <span className="text-slate-700">Fabric & Specifications</span>
                  <input
                    type="checkbox"
                    checked={showSpecs}
                    onChange={(e) => setShowSpecs(e.target.checked)}
                    className="rounded accent-navy text-navy focus:ring-navy"
                  />
                </label>
                <label className="flex items-center justify-between hover:bg-slate-50 p-1 rounded cursor-pointer">
                  <span className="text-slate-700">Factory & Sourcing</span>
                  <input
                    type="checkbox"
                    checked={showSourcing}
                    onChange={(e) => setShowSourcing(e.target.checked)}
                    className="rounded accent-navy text-navy focus:ring-navy"
                  />
                </label>
                <label className="flex items-center justify-between hover:bg-slate-50 p-1 rounded cursor-pointer">
                  <span className="text-slate-700">Pricing & Margins</span>
                  <input
                    type="checkbox"
                    checked={showPricing}
                    onChange={(e) => setShowPricing(e.target.checked)}
                    className="rounded accent-navy text-navy focus:ring-navy"
                  />
                </label>
                <label className="flex items-center justify-between hover:bg-slate-50 p-1 rounded cursor-pointer">
                  <span className="text-slate-700">Stock & Inventory</span>
                  <input
                    type="checkbox"
                    checked={showStock}
                    onChange={(e) => setShowStock(e.target.checked)}
                    className="rounded accent-navy text-navy focus:ring-navy"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px] select-none">
            {/* 1. Selection Checkbox */}
            <th className="py-3 px-4 w-12 text-center">
              <input
                type="checkbox"
                checked={
                  filteredProducts.length > 0 &&
                  selectedIds.length === filteredProducts.length
                }
                onChange={handleSelectAll}
                className="rounded border-slate-300 accent-navy text-navy focus:ring-navy cursor-pointer"
              />
            </th>

            {/* 2. Product Name, Codes & Identity */}
            <th
              onClick={() => handleSort('productName')}
              className="py-3 px-4 cursor-pointer hover:text-navy min-w-[260px]"
            >
              <div className="flex items-center gap-1.5">
                <span>Product & Identification</span>
                {sortField === 'productName' &&
                  (sortAsc ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />)}
              </div>
            </th>

            {/* 3. Category & Fabric Specs */}
            {showSpecs && (
              <th className="py-3 px-4 min-w-[200px]">
                Fabric & Specifications
              </th>
            )}

            {/* 4. Factory & Customer */}
            {showSourcing && (
              <th className="py-3 px-4 min-w-[190px]">
                Factory & Customer Sourcing
              </th>
            )}

            {/* 5. Pricing & Margins */}
            {showPricing && (
              <th
                onClick={() => handleSort('salePrice')}
                className="py-3 px-4 cursor-pointer hover:text-navy min-w-[170px]"
              >
                <div className="flex items-center gap-1.5">
                  <span>Pricing (EXW / FOB / Sale)</span>
                  {sortField === 'salePrice' &&
                    (sortAsc ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />)}
                </div>
              </th>
            )}

            {/* 6. Stock & Inventory */}
            {showStock && (
              <th className="py-3 px-4 min-w-[150px]">
                Ready Stock & MOQ
              </th>
            )}

            {/* 7. Actions */}
            <th className="py-3 px-4 text-right w-28">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {sortedProducts.length === 0 ? (
            <tr>
              <td colSpan={visibleColCount} className="py-12 text-center text-slate-400">
                <div className="flex flex-col items-center justify-center gap-2">
                  <FiLayers size={28} className="text-slate-300" />
                  <span className="text-sm font-medium text-slate-600">
                    No products found matching filters
                  </span>
                  <span className="text-xs text-slate-400">
                    Try adjusting your filter options or add a new garment style.
                  </span>
                </div>
              </td>
            </tr>
          ) : (
            sortedProducts.map((p) => {
              const isSelected = selectedIds.includes(p.id)
              const isExpanded = expandedRowIds.includes(p.id)
              const margin = calculateMargin(p.factoryPriceExw, p.salePrice)
              const cellPadding = density === 'comfortable' ? 'py-4' : 'py-2.5'

              return (
                <Fragment key={p.id}>
                  <tr
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-navy/5' : 'bg-white'
                    }`}
                  >
                    {/* Checkbox & Expand Arrow */}
                    <td className={`${cellPadding} px-4 text-center align-top`}>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => toggleRowExpand(p.id)}
                          title={isExpanded ? 'Collapse' : 'Expand details'}
                          className="text-slate-400 hover:text-navy transition-colors cursor-pointer"
                        >
                          <FiChevronRight
                            size={14}
                            className={`transition-transform duration-150 ${
                              isExpanded ? 'rotate-90 text-navy' : ''
                            }`}
                          />
                        </button>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(p.id)}
                          className="rounded border-slate-300 accent-navy text-navy focus:ring-navy cursor-pointer"
                        />
                      </div>
                    </td>

                    {/* Product & Identification */}
                    <td className={`${cellPadding} px-4 align-top`}>
                      <div className="flex items-start gap-3.5">
                        {/* Image Thumbnail */}
                        <div className="w-12 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative group">
                          {p.productImage ? (
                            <img
                              src={p.productImage}
                              alt={p.productName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
                              No Pic
                            </div>
                          )}
                          {p.featuredProduct === 'Yes' && (
                            <span
                              title="Featured Product"
                              className="absolute top-1 right-1 text-amber-500"
                            >
                              <FiStar size={10} className="fill-amber-400 text-amber-500" />
                            </span>
                          )}
                        </div>

                        {/* Name and Codes */}
                        <div className="flex-1 min-w-0">
                          <div
                            onClick={() => onView(p)}
                            className="font-bold text-slate-900 text-sm hover:text-navy cursor-pointer"
                          >
                            {p.productName}
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                            <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              {p.productCode}
                            </span>
                            <span className="text-slate-600">
                              SKU: <strong>{p.sku}</strong>
                            </span>
                            <span className="text-slate-400">
                              PO: {p.purchaseCode}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                              {p.productType}
                            </span>
                            {p.variant === 'Yes' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                Variants: {p.variantsList?.length || 'Yes'}
                              </span>
                            )}
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                p.productStatus === 'Active'
                                  ? 'bg-navy/5 text-navy border border-navy/20'
                                  : 'bg-slate-100 text-slate-500 border border-slate-200'
                              }`}
                            >
                              {p.productStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Fabric & Specifications */}
                    {showSpecs && (
                      <td className={`${cellPadding} px-4 align-top`}>
                        <div className="font-semibold text-slate-800 text-xs">
                          {p.category} • <span className="text-slate-600">{p.subcategory}</span>
                        </div>
                        <div className="text-xs text-slate-700 mt-1">
                          {p.fabricComposition || p.fabric}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {p.gsm} GSM • {p.pattern} Pattern
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Season: {p.season} ({p.gender})
                        </div>
                      </td>
                    )}

                    {/* Factory & Customer Sourcing */}
                    {showSourcing && (
                      <td className={`${cellPadding} px-4 align-top`}>
                        <div className="font-semibold text-slate-800 text-xs">
                          {p.factoryName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Factory Code:{' '}
                          <span className="text-navy font-bold">{p.factoryCode}</span>
                        </div>
                        <div className="text-xs text-slate-800 mt-1.5">
                          Client: <span className="font-medium">{p.customerName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Style Code: {p.customerStyleCode}
                        </div>
                        {p.repeatOrder === 'Yes' && (
                          <span className="text-[10px] text-navy bg-navy/5 border border-navy/20 px-1.5 py-0.2 rounded inline-block mt-1 font-medium">
                            Repeat: {p.repeatOrderNumber || 'Yes'}
                          </span>
                        )}
                      </td>
                    )}

                    {/* Pricing (EXW / FOB / Sale) */}
                    {showPricing && (
                      <td className={`${cellPadding} px-4 align-top`}>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-slate-900 font-bold text-sm">
                            ${Number(p.salePrice).toFixed(2)}
                          </span>
                          <span className="text-[10px] font-semibold text-navy uppercase">
                            Sale
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          EXW Cost: ${Number(p.factoryPriceExw).toFixed(2)}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          FOB: ${Number(p.fobPrice).toFixed(2)} ({p.fobPort})
                        </div>
                        {margin.marginPercent > 0 && (
                          <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded w-fit mt-1">
                            +{margin.marginPercent}% gross margin
                          </div>
                        )}
                      </td>
                    )}

                    {/* Ready Stock & MOQ */}
                    {showStock && (
                      <td className={`${cellPadding} px-4 align-top`}>
                        {p.readyStockAvailability === 'Yes' ? (
                          <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy bg-navy/5 border border-navy/20 px-2.5 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-navy"></span>
                              {Number(p.readyStockQuantity).toLocaleString()}{' '}
                              {p.readyStockQuantityUnit}
                            </span>
                            <div className="text-[11px] text-slate-500 mt-1">
                              MOQ: <strong>{p.moq}</strong> {p.quantityUnit}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[11px] text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-medium">
                              Made to Order
                            </span>
                            <div className="text-[11px] text-slate-500 mt-1">
                              MOQ: <strong>{p.moq}</strong> {p.quantityUnit}
                            </div>
                          </div>
                        )}
                      </td>
                    )}

                    {/* Actions */}
                    <td className={`${cellPadding} px-4 text-right align-top`}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onView(p)}
                          title="View Spec Sheet"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          onClick={() => onEdit(p)}
                          title="Edit Product"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => onDuplicate(p)}
                          title="Duplicate"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <FiCopy size={15} />
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline Expandable Drawer (Revealed smoothly on click) */}
                  {isExpanded && (
                    <tr className="bg-slate-50/70 border-b border-slate-200">
                      <td colSpan={visibleColCount} className="px-6 py-4">
                        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                            <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                              Tech Pack Specifications — {p.productName} ({p.productCode})
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Created: <strong>{p.createdAtDate}</strong> • Updated:{' '}
                              <strong>{p.updatedAtDate}</strong>
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                            {/* Available Colors & Sizes */}
                            <div>
                              <span className="font-semibold text-slate-700 block mb-1">
                                Available Colors ({p.availableColors?.length || 0}):
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {p.availableColors?.map((c) => (
                                  <span
                                    key={c}
                                    className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] border border-slate-200"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                              <span className="font-semibold text-slate-700 block mt-2.5 mb-1">
                                Size Range:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {p.sizeRange?.map((s) => (
                                  <span
                                    key={s}
                                    className="px-2 py-0.5 rounded bg-navy/5 text-navy text-[11px] font-mono border border-navy/20"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Production Schedule */}
                            <div>
                              <span className="font-semibold text-slate-700 block mb-1">
                                Production Timeline:
                              </span>
                              <div className="text-slate-600 space-y-1 text-[11px]">
                                <div>
                                  Development Date: <strong>{p.developmentDate}</strong>
                                </div>
                                <div>
                                  Shipment Date: <strong>{p.shipmentDate}</strong>
                                </div>
                                <div>
                                  Target Markets:{' '}
                                  <strong>{p.marketSuitability?.join(', ') || 'Global'}</strong>
                                </div>
                              </div>
                            </div>

                            {/* Tech Pack Description */}
                            <div className="md:col-span-2">
                              <span className="font-semibold text-slate-700 block mb-1">
                                Buyer Tech Pack Description:
                              </span>
                              <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                                {p.description || 'No description entered.'}
                              </p>
                            </div>
                          </div>

                          {/* Variant sub-SKUs */}
                          {p.variant === 'Yes' &&
                            p.variantsList &&
                            p.variantsList.length > 0 && (
                              <div className="pt-2.5 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="font-semibold text-slate-700 text-xs">
                                    Variant Combinations Matrix ({p.variantsList.length} SKUs):
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onView(p)}
                                    className="text-xs font-semibold text-navy hover:text-amber-600 hover:underline"
                                  >
                                    View Full Specification Sheet &gt;
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {p.variantsList.map((v) => (
                                    <span
                                      key={v.id}
                                      className="text-[11px] font-mono px-2 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700"
                                    >
                                      <strong className="text-navy">{v.sku}</strong> ({v.color} / {v.size}):{' '}
                                      {v.stockQuantity} pcs
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })
          )}
        </tbody>
      </table>

      {/* Table Footer */}
      <div className="py-3 px-4 border-t border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-800">{sortedProducts.length}</span> of{' '}
          <span className="font-semibold text-slate-800">{products.length}</span> styles
          {selectedIds.length > 0 && (
            <span className="ml-2 font-medium text-navy">
              ({selectedIds.length} selected)
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          Click row arrow (▶) to expand extra details • No horizontal scrollbar needed
        </div>
      </div>
    </div>
  )
}
