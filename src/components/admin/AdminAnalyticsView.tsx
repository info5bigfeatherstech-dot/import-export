import type { AdminProduct } from '../../types/adminProduct'
import { calculateMargin } from '../../utils/adminStorage'

interface AdminAnalyticsViewProps {
  products: AdminProduct[]
}

export default function AdminAnalyticsView({ products }: AdminAnalyticsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-bold text-slate-900">
          Export Pricing, FOB & Gross Margin Analytics
        </h2>
        <p className="text-xs text-slate-500">
          Financial yields comparing Factory EXW costs, FOB port prices, and customer sales invoices.
        </p>
      </div>

      {/* Pricing Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Code & Style</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Factory & FOB Port</th>
              <th className="py-3 px-4">Factory Cost (EXW)</th>
              <th className="py-3 px-4">FOB Price</th>
              <th className="py-3 px-4">Sale Invoiced</th>
              <th className="py-3 px-4">Gross Profit ($)</th>
              <th className="py-3 px-4">Gross Margin (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => {
              const m = calculateMargin(p.factoryPriceExw, p.salePrice)

              return (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-900 text-xs block">
                      {p.productCode}
                    </span>
                    <span className="text-slate-600 font-medium">{p.productName}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {p.category} • {p.subcategory}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-800 font-medium block">{p.factoryName}</span>
                    <span className="text-slate-400 text-[11px]">{p.fobPort} Port</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    ${Number(p.factoryPriceExw).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    ${Number(p.fobPrice).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-navy">
                    ${Number(p.salePrice).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600">
                    +${m.profit.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      +{m.marginPercent}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
