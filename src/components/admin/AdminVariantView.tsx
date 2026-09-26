import type { AdminProduct } from '../../types/adminProduct'
import { FiLayers } from 'react-icons/fi'

interface AdminVariantViewProps {
  products: AdminProduct[]
  onSelectProduct: (product: AdminProduct) => void
}

export default function AdminVariantView({
  products,
  onSelectProduct,
}: AdminVariantViewProps) {
  const variantProducts = products.filter((p) => p.variant === 'Yes')

  return (
    <div className="space-y-6">
      {/* Explainer Banner for User */}
      <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FiLayers size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Variant Management System (Clarified & Simplified)
            </h2>
            <p className="text-xs text-slate-500">
              Understanding garment variants and SKU generation without confusion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">1. Parent Product</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              The base garment design (e.g. <strong>Floral Maxi Dress</strong>, code{' '}
              <code>ST-1001</code>, base SKU <code>DRS-001</code>).
            </p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">2. Variant Dimensions</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              The specific variation choices: <strong>Colors</strong> (Blue, Pink, Green) and{' '}
              <strong>Sizes</strong> (S, M, L, XL).
            </p>
          </div>
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200">
            <span className="font-bold text-blue-950 block mb-1">3. Generated Sub-SKU</span>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Each combination gets a unique barcode & SKU (e.g.{' '}
              <code>DRS-001-BLU-S</code>) for carton packing and barcode scanning!
            </p>
          </div>
        </div>
      </div>

      {/* List of Products with Active Variants */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Multi-Variant Products ({variantProducts.length} styles)
            </h3>
            <p className="text-xs text-slate-500">
              Products configured with colorways and size scale matrices.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {variantProducts.map((p) => {
            const totalStock = (p.variantsList || []).reduce(
              (acc, v) => acc + (v.stockQuantity || 0),
              0
            )

            return (
              <div key={p.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img
                        src={p.productImage}
                        alt={p.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {p.productCode}
                        </span>
                        <span className="text-xs font-semibold text-slate-800">
                          {p.productName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200">
                          Base SKU: {p.sku}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Colors: <strong className="text-slate-700">{p.availableColors?.join(', ')}</strong> • Sizes:{' '}
                        <strong className="text-slate-700">{p.sizeRange?.join(', ')}</strong> • Total Variant Units:{' '}
                        <strong className="text-blue-700 font-mono">{totalStock.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProduct(p)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 hover:border-blue-400 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    View / Edit Matrix
                  </button>
                </div>

                {/* Sub-table of variants */}
                {p.variantsList && p.variantsList.length > 0 ? (
                  <div className="border border-slate-200 rounded-lg overflow-x-auto bg-slate-50/50">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-500 text-[11px]">
                        <tr>
                          <th className="py-2 px-3">Variant SKU</th>
                          <th className="py-2 px-3">Color</th>
                          <th className="py-2 px-3">Size</th>
                          <th className="py-2 px-3">Stock Units</th>
                          <th className="py-2 px-3">Barcode Tag</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {p.variantsList.map((v) => (
                          <tr key={v.id} className="hover:bg-blue-50/20">
                            <td className="py-2 px-3 font-mono font-semibold text-blue-700">
                              {v.sku}
                            </td>
                            <td className="py-2 px-3 text-slate-700">{v.color}</td>
                            <td className="py-2 px-3 text-slate-700">{v.size}</td>
                            <td className="py-2 px-3 font-mono text-slate-800">
                              {v.stockQuantity.toLocaleString()} pcs
                            </td>
                            <td className="py-2 px-3 font-mono text-[11px] text-slate-400">
                              {v.barcode}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    No individual SKU combinations generated yet. Edit this product to generate the combination matrix.
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
