import {
  FiGrid,
  FiBox,
  FiFolder,
  FiTruck,
  FiUsers,
  FiExternalLink,
  FiLogOut,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface AdminSidebarProps {
  currentTab: string
  setCurrentTab: (tab: string) => void
  productCount: number
  categoryCount?: number
  onAddNew?: () => void
}

export default function AdminSidebar({
  currentTab,
  setCurrentTab,
  productCount,
  categoryCount,
}: AdminSidebarProps) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out of the Admin Panel?')) {
      await logout()
      navigate('/admin/login', { replace: true })
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: FiGrid },
    { id: 'products', label: 'Product Catalog', icon: FiBox, count: productCount },
    { id: 'categories', label: 'Category Hierarchy', icon: FiFolder, count: categoryCount },
    { id: 'factories', label: 'Factory Sourcing', icon: FiTruck },
    { id: 'customers', label: 'Client Accounts', icon: FiUsers },
  ]

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen select-none z-30 overflow-hidden">
      {/* Brand Header */}
      <div className="h-16 shrink-0 border-b border-slate-200 px-5 flex items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center font-bold text-sm shadow-xs shadow-navy/20">
            S
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm tracking-tight leading-none">
              ShivaSun ERP
            </div>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">
              Product Admin Panel
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
                  ? 'bg-navy/5 text-navy font-semibold border border-navy/20 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={15}
                  className={isActive ? 'text-navy' : 'text-slate-400'}
                />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-navy text-white font-bold'
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

      {/* Footer User Info & Return to Website */}
      <div className="shrink-0 p-3 border-t border-slate-200 bg-slate-50/50 space-y-2">
        {/* User Card */}
        {admin && (
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs shadow-2xs">
            <div className="truncate pr-1">
              <div className="text-[11px] font-bold text-slate-800 truncate">
                {admin.email}
              </div>
              <div className="text-[10px] text-emerald-600 font-medium">
                Admin Session Active
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <FiLogOut size={13} />
            </button>
          </div>
        )}

        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 text-xs font-medium text-slate-600 hover:text-navy hover:bg-slate-100 rounded-lg border border-slate-200 bg-white transition-colors"
        >
          <FiExternalLink size={13} />
          <span>Exit to Main Website</span>
        </Link>
      </div>
    </aside>
  )
}
