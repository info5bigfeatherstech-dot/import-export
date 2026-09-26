import {
  FiX,
  FiPrinter,
  FiEdit2,
  FiCheckCircle,
  FiDollarSign,
} from 'react-icons/fi'
import type { AdminProduct } from '../../types/adminProduct'
import { calculateMargin } from '../../utils/adminStorage'

interface AdminProductDetailModalProps {
  product: AdminProduct | null
  isOpen: boolean
  onClose: () => void
  onEdit: (product: AdminProduct) => void
}

export default function AdminProductDetailModal({
  product,
  isOpen,
  onClose,
  onEdit,
}: AdminProductDetailModalProps) {
  if (!isOpen || !product) return null

  const margin = calculateMargin(product.factoryPriceExw, product.salePrice)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-xs">
              {product.productCode}
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {product.productName}
              </h2>
              <span className="text-xs text-slate-500">
                SKU: <strong className="font-mono text-slate-700">{product.sku}</strong> • PO:{' '}
                <strong className="font-mono text-slate-700">{product.purchaseCode}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Specification Sheet"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <FiPrinter size={16} />
            </button>
            <button
              onClick={() => {
                onClose()
                onEdit(product)
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer"
            >
              <FiEdit2 size={13} />
              <span>Edit Details</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Banner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Column */}
            <div className="md:col-span-1">
              <div className="w-full aspect-[3/4] rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative shadow-2xs">
                {product.productImage ? (
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No image available
                  </div>
                )}
                {product.productStatus === 'Active' && (
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500 text-white shadow-xs">
                    Active
                  </span>
                )}
                {product.featuredProduct === 'Yes' && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-slate-950 shadow-xs">
                    ★ Featured
                  </span>
                )}
              </div>
            </div>

            {/* Quick Summary & Financial Overview */}
            <div className="md:col-span-2 space-y-4">
              {/* Product Header Info */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {product.productType}
                  </span>
                  <span className="text-xs text-slate-500">
                    {product.category} &gt; {product.subcategory}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{product.productName}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {product.description || 'No description provided.'}
                </p>
              </div>

              {/* Sourcing & Pricing Card */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FiDollarSign className="text-blue-600" />
                  <span>Costing & Pricing Summary</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Factory EXW
                    </span>
                    <span className="text-sm font-bold text-slate-800 font-mono">
                      ${Number(product.factoryPriceExw).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      FOB Price
                    </span>
                    <span className="text-sm font-bold text-slate-800 font-mono">
                      ${Number(product.fobPrice).toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Sale Invoiced
                    </span>
                    <span className="text-sm font-bold text-blue-600 font-mono">
                      ${Number(product.salePrice).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                  <span className="text-slate-600">
                    FOB Port: <strong className="text-slate-800">{product.fobPort}</strong>
                  </span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +{margin.marginPercent}% Gross Margin (${margin.profit.toFixed(2)}/pc)
                  </span>
                </div>
              </div>

              {/* Inventory & Readiness Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Ready Stock
                  </span>
                  {product.readyStockAvailability === 'Yes' ? (
                    <div className="text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-700">
                        <FiCheckCircle size={13} className="text-blue-600" />
                        Available Immediately
                      </span>
                      <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                        {Number(product.readyStockQuantity).toLocaleString()}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          {product.readyStockQuantityUnit}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 font-medium">
                      Made to Order / Production on Demand
                    </div>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-white">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Order MOQ
                  </span>
                  <div className="text-base font-bold text-slate-900 font-mono">
                    {product.moq}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      {product.quantityUnit}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Target Markets: {product.marketSuitability?.join(', ') || 'Global'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Specification Data Grid (44 fields displayed clearly) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Export Tech Pack & Specifications</span>
              <span className="text-[11px] font-normal text-slate-500">
                Created: {product.createdAtDate} • Updated: {product.updatedAtDate}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 p-4 gap-4 text-xs">
              {/* Column 1: Fabric & Physical */}
              <div className="space-y-2">
                <div className="font-semibold text-blue-700 pb-1 border-b border-slate-100 uppercase text-[11px]">
                  Fabric & Construction
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Fabric Type:</span>
                  <span className="font-medium text-slate-800">{product.fabric}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Composition:</span>
                  <span className="font-medium text-slate-800">{product.fabricComposition}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">GSM Weight:</span>
                  <span className="font-medium text-slate-800 font-mono">{product.gsm} GSM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Pattern:</span>
                  <span className="font-medium text-slate-800">{product.pattern}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Base Color:</span>
                  <span className="font-medium text-slate-800">{product.color}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Available Colors:</span>
                  <span className="font-medium text-slate-800">
                    {product.availableColors?.join(', ') || product.color}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Size Range:</span>
                  <span className="font-medium text-slate-800">
                    {product.sizeRange?.join(', ')}
                  </span>
                </div>
              </div>

              {/* Column 2: Classification & Schedule */}
              <div className="space-y-2 sm:pl-4">
                <div className="font-semibold text-blue-700 pb-1 border-b border-slate-100 uppercase text-[11px]">
                  Classification & Dates
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Gender / Age:</span>
                  <span className="font-medium text-slate-800">
                    {product.gender} • {product.ageGroup}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Collection:</span>
                  <span className="font-medium text-slate-800">{product.collection}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Season:</span>
                  <span className="font-medium text-slate-800">{product.season}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Development Date:</span>
                  <span className="font-medium text-slate-800">{product.developmentDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Shipment Date:</span>
                  <span className="font-medium text-slate-800">{product.shipmentDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Market Suitability:</span>
                  <span className="font-medium text-slate-800">
                    {product.marketSuitability?.join(', ')}
                  </span>
                </div>
              </div>

              {/* Column 3: Sourcing & Accounts */}
              <div className="space-y-2 sm:pl-4">
                <div className="font-semibold text-blue-700 pb-1 border-b border-slate-100 uppercase text-[11px]">
                  Supply Chain & Client
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Factory Name:</span>
                  <span className="font-medium text-slate-800">{product.factoryName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Factory Code:</span>
                  <span className="font-mono font-semibold text-blue-600">
                    {product.factoryCode}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Customer Name:</span>
                  <span className="font-medium text-slate-800">{product.customerName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Customer Style Code:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {product.customerStyleCode}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Repeat Order:</span>
                  <span className="font-medium text-slate-800">
                    {product.repeatOrder}{' '}
                    {product.repeatOrder === 'Yes' && `(${product.repeatOrderNumber || '1st'})`}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Has Variants:</span>
                  <span className="font-medium text-slate-800">{product.variant}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Variants Table if any */}
          {product.variant === 'Yes' && product.variantsList && product.variantsList.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between">
                <span>SKU Variant Combinations Matrix ({product.variantsList.length} Variations)</span>
                <span className="text-[11px] text-blue-600 font-normal">
                  Individual barcode & stock allocation
                </span>
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 text-[11px]">
                  <tr>
                    <th className="py-2 px-3">Variant SKU</th>
                    <th className="py-2 px-3">Color</th>
                    <th className="py-2 px-3">Size</th>
                    <th className="py-2 px-3">Stock Allocation</th>
                    <th className="py-2 px-3">Barcode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {product.variantsList.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono font-semibold text-blue-700">{v.sku}</td>
                      <td className="py-2 px-3 text-slate-700">{v.color}</td>
                      <td className="py-2 px-3 text-slate-700">{v.size}</td>
                      <td className="py-2 px-3 font-mono text-slate-800">
                        {v.stockQuantity.toLocaleString()} pcs
                      </td>
                      <td className="py-2 px-3 font-mono text-slate-400 text-[11px]">
                        {v.barcode || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-400 text-[11px]">
            ShivaSun Moderno Impex Pvt. Ltd. • Product Admin
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
          >
            Close Spec Sheet
          </button>
        </div>
      </div>
    </div>
  )
}
