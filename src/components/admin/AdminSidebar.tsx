import {
  FiBox,
  FiLayers,
  FiTruck,
  FiUsers,
  FiBarChart2,
  FiExternalLink,
  FiPlus,
  FiDatabase,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface AdminSidebarProps {
  currentTab: string
  setCurrentTab: (tab: string) => void
  productCount: number
  onAddNew: () => void
}

export default function AdminSidebar({
  currentTab,
  setCurrentTab,
  productCount,
  onAddNew,
}: AdminSidebarProps) {
  const menuItems = [
    { id: 'products', label: 'Product Catalog', icon: FiBox, count: productCount },
    { id: 'variants', label: 'Variant Matrix', icon: FiLayers },
    { id: 'factories', label: 'Factory Sourcing', icon: FiTruck },
    { id: 'customers', label: 'Client Accounts', icon: FiUsers },
    { id: 'analytics', label: 'Cost & Margin Analytics', icon: FiBarChart2 },
    { id: 'database', label: 'Master Settings', icon: FiDatabase },
  ]

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 border-b border-slate-200 px-5 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shadow-blue-500/20">
            S
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm tracking-tight leading-none">
              ShivaSun ERP
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-0.5">
              Product Admin Panel
            </div>
          </div>
        </Link>
        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/60 rounded">
          v2.6
        </span>
      </div>

      {/* Action button */}
      <div className="p-4">
        <button
          onClick={onAddNew}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/15 transition-all duration-150 cursor-pointer"
        >
          <FiPlus className="stroke-[2.5]" size={15} />
          <span>New Product Entry</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Management
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/70 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={15}
                  className={isActive ? 'text-blue-600' : 'text-slate-400'}
                />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer Info & Return to Website */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50 space-y-2">
        <div className="px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>System Status</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-mono">
            DB: LocalStorage Active
          </div>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg border border-slate-200 bg-white transition-colors"
        >
          <FiExternalLink size={13} />
          <span>Exit to Main Website</span>
        </Link>
      </div>
    </aside>
  )
}
