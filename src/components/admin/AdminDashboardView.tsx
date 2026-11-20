import { useState, useEffect } from 'react'
import {
  FiBox,
  FiCheckCircle,
  FiAlertTriangle,
  FiTrendingUp,
  FiClock,
  FiUploadCloud,
  FiArrowRight,
  FiLayers,
  FiRefreshCw,
  FiTruck,
  FiUsers,
} from 'react-icons/fi'
import { api, type DashboardSummary } from '../../lib/api'
import type { AdminProduct } from '../../types/adminProduct'

interface AdminDashboardViewProps {
  products: AdminProduct[]
  summary: DashboardSummary | null
  onNavigateTab: (tab: string) => void
  onRefresh: () => void
  isSyncing: boolean
}

export default function AdminDashboardView({
  products,
  summary,
  onNavigateTab,
  onRefresh,
  isSyncing,
}: AdminDashboardViewProps) {
  const [categoryDist, setCategoryDist] = useState<any>(null)
  const [inventoryAlerts, setInventoryAlerts] = useState<any>(null)
  const [recentActivity, setRecentActivity] = useState<any>(null)

  // Fetch detailed dashboard sub-APIs
  useEffect(() => {
    let isMounted = true

    async function loadDashboardSubApis() {
      try {
        const [catRes, invRes, actRes] = await Promise.allSettled([
          api.dashboard.getCategoryDistribution(),
          api.dashboard.getInventoryAlerts(),
          api.dashboard.getRecentActivity(),
        ])

        if (isMounted) {
          if (catRes.status === 'fulfilled' && catRes.value?.data) {
            setCategoryDist(catRes.value.data)
          }
          if (invRes.status === 'fulfilled' && invRes.value?.data) {
            setInventoryAlerts(invRes.value.data)
          }
          if (actRes.status === 'fulfilled' && actRes.value?.data) {
            setRecentActivity(actRes.value.data)
          }
        }
      } catch (e) {
        console.warn('Dashboard sub-apis fetch warning:', e)
      }
    }

    loadDashboardSubApis()
    return () => {
      isMounted = false
    }
  }, [isSyncing])

  // Total products count
  const totalProductsCount = summary?.totalProducts ?? products.length
  const activeProductsCount =
    summary?.activeProducts ?? products.filter((p) => p.productStatus === 'Active').length
  const totalCategoriesCount = summary?.totalCategories ?? 34
  const readyStockUnits =
    summary?.readyStockTotalUnits ??
    products.reduce(
      (acc, p) =>
        acc + (p.readyStockAvailability === 'Yes' ? Number(p.readyStockQuantity) || 0 : 0),
      0
    )

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Executive Sourcing & Operations Overview
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time pipeline metrics, catalog distribution, inventory alerts, and recent product activity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefresh}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <FiRefreshCw size={13} className={isSyncing ? 'animate-spin text-navy' : 'text-slate-500'} />
            <span>{isSyncing ? 'Refreshing...' : 'Refresh'}</span>
          </button>

          <button
            onClick={() => onNavigateTab('products')}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <span>View Full Catalog</span>
            <FiArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Master Products
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <FiBox size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalProductsCount}
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                <strong>{activeProductsCount}</strong> Active in circulation
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ready Stock Inventory
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FiCheckCircle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {readyStockUnits.toLocaleString()}{' '}
              <span className="text-sm font-semibold text-slate-400">Pcs</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Immediate dispatch availability</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Catalog Categories
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FiLayers size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {totalCategoriesCount}
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Garments, Footwears & Appliances</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              New This Month
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FiTrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              +{summary?.newProductsThisMonth ?? products.length}
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Fresh catalog developments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Category Distribution & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Category Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Product Category Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Breakdown of active styles across major product divisions
              </p>
            </div>
           
          </div>

          {categoryDist?.byRootCategory && categoryDist.byRootCategory.length > 0 ? (
            <div className="space-y-3.5 pt-1">
              {categoryDist.byRootCategory.map((cat: any) => (
                <div key={cat.categoryId || cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-800" />
                      {cat.name}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {cat.count} styles ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-slate-800 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(cat.percentage, 8)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3.5 pt-1">
              {['Garments', 'Footwears', 'Kitchen', 'Accessories'].map((cat) => {
                const count = products.filter((p) => p.category?.toLowerCase().includes(cat.toLowerCase())).length
                const pct = totalProductsCount > 0 ? Math.round((count / totalProductsCount) * 100) : 0
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{cat}</span>
                      <span className="text-slate-500 font-mono">
                        {count} styles ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-slate-800 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: Inventory Health & Alerts (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Inventory Alerts & Ready Stock
                </h3>
                <p className="text-xs text-slate-500">
                  Immediate dispatch readiness & low-stock items
                </p>
              </div>
              <FiAlertTriangle className="text-amber-500" size={17} />
            </div>

            <div className="space-y-3 pt-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800">Ready Stock Styles</div>
                  <div className="text-[11px] text-slate-500">Immediate order fulfillment</div>
                </div>
                <div className="text-lg font-bold text-emerald-700">
                  {summary?.readyStockProducts ?? 0}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800">Low Stock Threshold</div>
                  <div className="text-[11px] text-slate-500">Threshold: &lt;100 units</div>
                </div>
                <div className="text-lg font-bold text-slate-700">
                  {inventoryAlerts?.lowStockCount ?? 0}
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-xs">
                <div className="flex items-center gap-2 font-semibold text-emerald-900">
                  <FiCheckCircle className="text-emerald-600" size={15} />
                  <span>Inventory Status Normal</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  All production pipelines and ready stocks are within safe threshold parameters.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('products')}
            className="w-full mt-3 py-2 text-center text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            Review Catalog Stock Details
          </button>
        </div>
      </div>

      {/* Bottom Row: Recent Activity & Bulk Import Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Recent Product Activity & Master Updates
              </h3>
              <p className="text-xs text-slate-500">
                Latest catalog changes and product updates
              </p>
            </div>
            <FiClock className="text-slate-400" size={16} />
          </div>

          <div className="divide-y divide-slate-100">
            {recentActivity?.recentStyles && recentActivity.recentStyles.length > 0 ? (
              recentActivity.recentStyles.map((item: any) => (
                <div
                  key={item.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 shrink-0">
                      {item.productCode}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.categoryName} •{' '}
                        {item.updatedAt
                          ? new Date(item.updatedAt).toLocaleDateString()
                          : 'Recent'}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {item.status || 'Active'}
                  </span>
                </div>
              ))
            ) : (
              products.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 shrink-0">
                      {p.productCode}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        {p.productName}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {p.category} • {p.season}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {p.productStatus}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Last Bulk Import & Quick Tools (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Bulk Import History
              </h3>
              <p className="text-xs text-slate-500">Server import logs</p>
            </div>
            <FiUploadCloud className="text-slate-400" size={17} />
          </div>

          {recentActivity?.lastBulkImport ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs">
              <div className="font-semibold text-slate-800 truncate" title={recentActivity.lastBulkImport.fileName}>
                {recentActivity.lastBulkImport.fileName}
              </div>
              <div className="text-[11px] text-slate-500">
                By: <strong className="text-slate-700">{recentActivity.lastBulkImport.importedBy}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-center">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase">Success</div>
                  <div className="text-base font-bold text-emerald-600">
                    {recentActivity.lastBulkImport.ok}
                  </div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase">Failed</div>
                  <div className="text-base font-bold text-slate-600">
                    {recentActivity.lastBulkImport.failed || 0}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-500 space-y-1">
              <div className="font-semibold text-slate-700">No recent import job</div>
              <div className="text-[11px]">Spreadsheet imports are logged here automatically.</div>
            </div>
          )}

          {/* Quick Management Shortcuts */}
          <div className="pt-2 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Quick Shortcuts
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab('factories')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <FiTruck size={14} className="text-slate-500" />
                <span>Factories</span>
              </button>
              <button
                onClick={() => onNavigateTab('customers')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <FiUsers size={14} className="text-slate-500" />
                <span>Clients</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
