import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AdminProduct } from '../../types/adminProduct'
import { FiTruck, FiPlus } from 'react-icons/fi'

interface AdminFactoryViewProps {
  products: AdminProduct[]
  factories: string[]
  onAddNewFactory: (name: string) => void
}

export default function AdminFactoryView({
  products,
  factories,
  onAddNewFactory,
}: AdminFactoryViewProps) {
  const [newFactory, setNewFactory] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    if (newFactory.trim()) {
      onAddNewFactory(newFactory.trim())
      setNewFactory('')
      setShowAdd(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Manufacturing Partner Sourcing Database
          </h2>
          <p className="text-xs text-slate-500">
            Approved garment production factories, assigned F-codes, and running styles.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <FiPlus size={14} />
          <span>Add Manufacturing Factory</span>
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="p-4 bg-white rounded-xl border border-blue-200 shadow-2xs flex items-center gap-3"
        >
          <input
            type="text"
            required
            value={newFactory}
            onChange={(e) => setNewFactory(e.target.value)}
            placeholder="Enter factory name (e.g. Apex Textiles Ltd.)..."
            className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:bg-white"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold"
          >
            Save Factory
          </button>
          <button
            type="button"
            onClick={() => setShowAdd(false)}
            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Grid of factories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factories.map((fac) => {
          const factoryProducts = products.filter((p) => p.factoryName === fac)
          const totalUnits = factoryProducts.reduce((acc, p) => {
            return (
              acc +
              (p.readyStockAvailability === 'Yes'
                ? Number(p.readyStockQuantity) || 0
                : 0)
            )
          }, 0)

          return (
            <div
              key={fac}
              className="bg-white rounded-xl border border-slate-200 p-4.5 hover:border-blue-300 transition-all shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                  <FiTruck size={16} />
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Approved Vendor
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{fac}</h3>
                <span className="text-[11px] text-slate-500">
                  Assigned Styles: <strong>{factoryProducts.length}</strong> styles
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Factory Codes:</span>
                  <span className="font-mono font-semibold text-blue-700">
                    {factoryProducts.map((p) => p.factoryCode).join(', ') || 'F26-00X'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Ready Stock in Line:</span>
                  <span className="font-mono text-slate-800">
                    {totalUnits.toLocaleString()} pcs
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
