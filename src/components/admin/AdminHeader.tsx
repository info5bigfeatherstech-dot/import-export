import { FiSearch, FiDownload, FiPlus } from 'react-icons/fi'

interface AdminHeaderProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onAddNew: () => void
  onExportCsv: () => void
  totalCount: number
}

export default function AdminHeader({
  searchTerm,
  setSearchTerm,
  onAddNew,
  onExportCsv,
  totalCount,
}: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs & Context */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">Garments & Apparel</span>
            <span>/</span>
            <span className="text-blue-600 font-semibold">Product Master ({totalCount})</span>
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight leading-none mt-1">
            Product Database Management
          </h1>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={15}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Code (ST-1001), SKU, Fabric, Factory, Customer..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 transition-all outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions & User */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onExportCsv}
          title="Export CSV / JSON"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
        >
          <FiDownload size={13} className="text-slate-500" />
          <span>Export CSV</span>
        </button>

        <button
          onClick={onAddNew}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
        >
          <FiPlus className="stroke-[2.5]" size={14} />
          <span>Add Product</span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-800 leading-none">
              Merchandiser
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">ShivaSun Sourcing</div>
          </div>
        </div>
      </div>
    </header>
  )
}
