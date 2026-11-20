import { FiDownload, FiPlus, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface AdminHeaderProps {
  onAddNew: () => void
  onExportCsv: () => void
  totalCount?: number
  currentTab?: string
}

export default function AdminHeader({
  onAddNew,
  onExportCsv,
  totalCount = 0,
  currentTab = 'products',
}: AdminHeaderProps) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out of the Admin Panel?')) {
      await logout()
      navigate('/admin/login', { replace: true })
    }
  }

  const initials = admin?.email
    ? admin.email.substring(0, 2).toUpperCase()
    : 'AD'

  return (
    <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Clean Page Title */}
      <div>
        <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none">
          {currentTab === 'dashboard'
            ? 'Dashboard Overview'
            : currentTab === 'categories'
            ? 'Category Hierarchy & Master Taxonomy'
            : currentTab === 'factories'
            ? 'Factory Sourcing'
            : currentTab === 'customers'
            ? 'Client Accounts'
            : `Product Database Management (${totalCount})`}
        </h1>
      </div>

      {/* Right: Actions & User */}
      <div className="flex items-center gap-2">
        <button
          onClick={onExportCsv}
          title="Export CSV / JSON"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
        >
          <FiDownload size={13} className="text-slate-500" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={onAddNew}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-xs shadow-navy/20 transition-all cursor-pointer"
        >
          <FiPlus className="stroke-[2.5]" size={14} />
          <span>Add Product</span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        {/* User Profile & Sign Out */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-navy/10 border border-navy/20 text-navy font-bold text-xs flex items-center justify-center">
            {initials}
          </div>
          <div className="hidden md:block text-left max-w-[140px]">
            <div className="text-xs font-semibold text-slate-800 leading-none truncate">
              {admin?.email ? admin.email.split('@')[0] : 'Admin'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">
              {admin?.email || 'Authenticated'}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1 cursor-pointer"
          >
            <FiLogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  )
}
