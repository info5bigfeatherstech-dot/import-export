import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AdminProduct } from '../../types/adminProduct'
import { FiUsers, FiPlus } from 'react-icons/fi'

interface AdminCustomerViewProps {
  products: AdminProduct[]
  customers: string[]
  onAddNewCustomer: (name: string) => void
}

export default function AdminCustomerView({
  products,
  customers,
  onAddNewCustomer,
}: AdminCustomerViewProps) {
  const [newCustomer, setNewCustomer] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    if (newCustomer.trim()) {
      onAddNewCustomer(newCustomer.trim())
      setNewCustomer('')
      setShowAdd(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Client Accounts & Buyer Databases
          </h2>
          <p className="text-xs text-slate-500">
            Registered wholesale buyers, auto-generated customer style codes, and repeat orders.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-3.5 py-1.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <FiPlus size={14} />
          <span>Add Client Account</span>
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="p-4 bg-white rounded-xl border border-navy/20 shadow-2xs flex items-center gap-3"
        >
          <input
            type="text"
            required
            value={newCustomer}
            onChange={(e) => setNewCustomer(e.target.value)}
            placeholder="Enter client name (e.g. XYZ Fashion)..."
            className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-navy focus:bg-white"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-navy hover:bg-navy-light text-white rounded-lg text-xs font-semibold"
          >
            Save Client
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

      {/* Grid of customers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((cust) => {
          const clientProducts = products.filter((p) => p.customerName === cust)
          const repeatOrders = clientProducts.filter((p) => p.repeatOrder === 'Yes')

          return (
            <div
              key={cust}
              className="bg-white rounded-xl border border-slate-200 p-4.5 hover:border-navy/30 transition-all shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold text-xs">
                  <FiUsers size={16} />
                </div>
                <span className="text-[10px] font-semibold text-navy bg-navy/5 px-2 py-0.5 rounded border border-navy/20">
                  Global Client
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm">{cust}</h3>
                <span className="text-[11px] text-slate-500">
                  Total Styles Ordered: <strong>{clientProducts.length}</strong>
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Customer Style Codes:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {clientProducts.map((p) => p.customerStyleCode).join(', ') || 'C26-00X'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Repeat Order Program:</span>
                  <span className="font-medium text-emerald-600">
                    {repeatOrders.length} active re-runs
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
