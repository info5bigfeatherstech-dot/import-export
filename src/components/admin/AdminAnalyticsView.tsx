import type { AdminProduct } from '../../types/adminProduct'
import { calculateMargin } from '../../utils/adminStorage'
import type { DashboardSummary } from '../../lib/api'
import { FiPackage, FiLayers, FiCheckCircle, FiDatabase } from 'react-icons/fi'

interface AdminAnalyticsViewProps {
  products: AdminProduct[]
  dashboardSummary?: DashboardSummary | null
}

export default function AdminAnalyticsView({ products, dashboardSummary }: AdminAnalyticsViewProps) {
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

      {/* Backend API Dashboard Summary Cards if available */}
      {dashboardSummary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiPackage size={12} className="text-slate-700" />
              <span>MongoDB Products</span>
            </div>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {dashboardSummary.totalProducts}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {dashboardSummary.activeProducts} Active in DB
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiLayers size={12} className="text-slate-700" />
              <span>Categories</span>
            </div>
            <div className="text-lg font-bold text-slate-900 mt-1">
              {dashboardSummary.totalCategories}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Garments, Footwears & More
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiCheckCircle size={12} className="text-emerald-600" />
              <span>Ready Stock Units</span>
            </div>
            <div className="text-lg font-bold text-emerald-700 mt-1">
              {dashboardSummary.readyStockTotalUnits.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {dashboardSummary.readyStockProducts} Styles with Stock
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FiDatabase size={12} className="text-amber-600" />
              <span>New This Month</span>
            </div>
            <div className="text-lg font-bold text-amber-700 mt-1">
              +{dashboardSummary.newProductsThisMonth}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Fresh additions
            </div>
          </div>
        </div>
      )}

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
                    <span className="text-slate-800 font-medium block">{p.factoryName || 'Direct'}</span>
                    <span className="text-slate-400 text-[11px]">{p.fobPort} Port</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    ${Number(p.factoryPriceExw || 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    ${Number(p.fobPrice || 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    ${Number(p.salePrice || 0).toFixed(2)}
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
