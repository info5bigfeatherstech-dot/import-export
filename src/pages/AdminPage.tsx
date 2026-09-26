import { useState, useEffect } from 'react'
import type { AdminProduct } from '../types/adminProduct'
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredFactories,
  saveStoredFactories,
  getStoredCustomers,
  saveStoredCustomers,
} from '../utils/adminStorage'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'
import AdminStats from '../components/admin/AdminStats'
import AdminProductTable from '../components/admin/AdminProductTable'
import AdminProductModal from '../components/admin/AdminProductModal'
import AdminProductDetailModal from '../components/admin/AdminProductDetailModal'
import AdminVariantView from '../components/admin/AdminVariantView'
import AdminFactoryView from '../components/admin/AdminFactoryView'
import AdminCustomerView from '../components/admin/AdminCustomerView'
import AdminAnalyticsView from '../components/admin/AdminAnalyticsView'
import { INITIAL_ADMIN_PRODUCTS } from '../data/adminInitialData'
import { FiCheckCircle, FiInfo, FiTrash2, FiDownload, FiRotateCcw } from 'react-icons/fi'

export default function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [factories, setFactories] = useState<string[]>([])
  const [customers, setCustomers] = useState<string[]>([])

  const [currentTab, setCurrentTab] = useState<string>('products')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false)
  const [detailProduct, setDetailProduct] = useState<AdminProduct | null>(null)

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  // Load from local storage
  useEffect(() => {
    const loadedProducts = getStoredProducts()
    const loadedFactories = getStoredFactories()
    const loadedCustomers = getStoredCustomers()

    setProducts(loadedProducts)
    setFactories(loadedFactories)
    setCustomers(loadedCustomers)
  }, [])

  // Save product (create or update)
  const handleSaveProduct = (updated: AdminProduct) => {
    let nextList: AdminProduct[]
    const exists = products.some((p) => p.id === updated.id)

    if (exists) {
      nextList = products.map((p) => (p.id === updated.id ? updated : p))
      showToast(`Updated product "${updated.productName}" (${updated.productCode})`)
    } else {
      nextList = [updated, ...products]
      showToast(`Created new product "${updated.productName}" (${updated.productCode})`)
    }

    setProducts(nextList)
    saveStoredProducts(nextList)
    setEditingProduct(null)
  }

  // Delete product
  const handleDeleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id)
    if (window.confirm(`Are you sure you want to delete product ${target?.productCode || id}?`)) {
      const nextList = products.filter((p) => p.id !== id)
      setProducts(nextList)
      saveStoredProducts(nextList)
      setSelectedIds((prev) => prev.filter((i) => i !== id))
      showToast(`Deleted product ${target?.productCode || id}`)
    }
  }

  // Duplicate product
  const handleDuplicateProduct = (original: AdminProduct) => {
    const currentYearDigits = new Date().getFullYear().toString().slice(-2)
    const newCode = `ST-${1000 + products.length + 1}`
    const duplicated: AdminProduct = {
      ...original,
      id: `prod-${Date.now()}`,
      productCode: newCode,
      sku: `${original.sku}-COPY`,
      purchaseCode: `PUR-${(products.length + 1).toString().padStart(3, '0')}`,
      productName: `${original.productName} (Copy)`,
      factoryCode: `F${currentYearDigits}-${(products.length + 1).toString().padStart(3, '0')}`,
      customerStyleCode: `C${currentYearDigits}-${(products.length + 1).toString().padStart(3, '0')}`,
      createdAtDate: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
      updatedAtDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    }

    const nextList = [duplicated, ...products]
    setProducts(nextList)
    saveStoredProducts(nextList)
    showToast(`Duplicated ${original.productCode} as ${newCode}`)
  }

  // Bulk Delete
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return
    if (window.confirm(`Delete ${selectedIds.length} selected products?`)) {
      const nextList = products.filter((p) => !selectedIds.includes(p.id))
      setProducts(nextList)
      saveStoredProducts(nextList)
      showToast(`Removed ${selectedIds.length} products`)
      setSelectedIds([])
    }
  }

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Product Code',
      'SKU',
      'Purchase Code',
      'Product Name',
      'Product Type',
      'Variant',
      'Gender',
      'Age Group',
      'Category',
      'Subcategory',
      'Collection',
      'Season',
      'Development Date',
      'Shipment Date',
      'Fabric',
      'Fabric Composition',
      'GSM',
      'Pattern',
      'Color',
      'Available Colors',
      'Size Range',
      'MOQ',
      'Quantity Unit',
      'Market Suitability',
      'Factory Code',
      'Factory Name',
      'Factory Price (EXW)',
      'Sale Price',
      'FOB Price',
      'FOB Port',
      'Ready Stock Availability',
      'Ready Stock Quantity',
      'Ready Stock Quantity Unit',
      'Customer Name',
      'Customer Style Code',
      'Repeat Order',
      'Repeat Order Number',
      'Product Status',
      'Featured Product',
      'Created At',
      'Updated At',
    ]

    const rows = products.map((p) => [
      `"${p.productCode}"`,
      `"${p.sku}"`,
      `"${p.purchaseCode}"`,
      `"${p.productName.replace(/"/g, '""')}"`,
      `"${p.productType}"`,
      `"${p.variant}"`,
      `"${p.gender}"`,
      `"${p.ageGroup}"`,
      `"${p.category}"`,
      `"${p.subcategory}"`,
      `"${p.collection}"`,
      `"${p.season}"`,
      `"${p.developmentDate}"`,
      `"${p.shipmentDate}"`,
      `"${p.fabric}"`,
      `"${p.fabricComposition}"`,
      `"${p.gsm}"`,
      `"${p.pattern}"`,
      `"${p.color}"`,
      `"${p.availableColors?.join(', ') || ''}"`,
      `"${p.sizeRange?.join(', ') || ''}"`,
      `"${p.moq}"`,
      `"${p.quantityUnit}"`,
      `"${p.marketSuitability?.join(', ') || ''}"`,
      `"${p.factoryCode}"`,
      `"${p.factoryName}"`,
      `"${p.factoryPriceExw}"`,
      `"${p.salePrice}"`,
      `"${p.fobPrice}"`,
      `"${p.fobPort}"`,
      `"${p.readyStockAvailability}"`,
      `"${p.readyStockQuantity}"`,
      `"${p.readyStockQuantityUnit}"`,
      `"${p.customerName}"`,
      `"${p.customerStyleCode}"`,
      `"${p.repeatOrder}"`,
      `"${p.repeatOrderNumber || ''}"`,
      `"${p.productStatus}"`,
      `"${p.featuredProduct}"`,
      `"${p.createdAtDate}"`,
      `"${p.updatedAtDate}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `shivasun_product_master_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Exported complete product dataset to CSV')
  }

  // Reset to initial mock database
  const handleResetData = () => {
    if (window.confirm('Reset catalog back to initial demonstration sample dataset?')) {
      setProducts(INITIAL_ADMIN_PRODUCTS)
      saveStoredProducts(INITIAL_ADMIN_PRODUCTS)
      showToast('Catalog restored to default demonstration records')
    }
  }

  // Add Factory
  const handleAddNewFactory = (name: string) => {
    if (!factories.includes(name)) {
      const next = [...factories, name]
      setFactories(next)
      saveStoredFactories(next)
      showToast(`Added manufacturing partner: ${name}`)
    }
  }

  // Add Customer
  const handleAddNewCustomer = (name: string) => {
    if (!customers.includes(name)) {
      const next = [...customers, name]
      setCustomers(next)
      saveStoredCustomers(next)
      showToast(`Added client account: ${name}`)
    }
  }

  // Filtered by global search term
  const searchedProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      p.productCode?.toLowerCase().includes(term) ||
      p.sku?.toLowerCase().includes(term) ||
      p.productName?.toLowerCase().includes(term) ||
      p.fabric?.toLowerCase().includes(term) ||
      p.factoryName?.toLowerCase().includes(term) ||
      p.customerName?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term) ||
      p.season?.toLowerCase().includes(term)
    )
  })

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-[Inter,system-ui,sans-serif] text-slate-800 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <FiCheckCircle size={15} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        productCount={products.length}
        onAddNew={() => {
          setEditingProduct(null)
          setIsModalOpen(true)
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddNew={() => {
            setEditingProduct(null)
            setIsModalOpen(true)
          }}
          onExportCsv={handleExportCsv}
          totalCount={products.length}
        />

        <main className="flex-1 p-6 w-full space-y-6">
          {/* Top Key Statistics Bar */}
          <AdminStats products={products} />

          {/* Bulk Selection Bar if any checked */}
          {selectedIds.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-blue-900 font-medium">
                <FiInfo className="text-blue-600" size={15} />
                <span>
                  <strong>{selectedIds.length}</strong> products selected across the table
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FiTrash2 size={13} />
                  <span>Delete Selected</span>
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Deselect All
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: PRODUCT CATALOG TABLE */}
          {currentTab === 'products' && (
            <AdminProductTable
              products={searchedProducts}
              onView={(p) => {
                setDetailProduct(p)
                setIsDetailOpen(true)
              }}
              onEdit={(p) => {
                setEditingProduct(p)
                setIsModalOpen(true)
              }}
              onDuplicate={handleDuplicateProduct}
              onDelete={handleDeleteProduct}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )}

          {/* TAB 2: VARIANT MATRIX VIEW */}
          {currentTab === 'variants' && (
            <AdminVariantView
              products={products}
              onSelectProduct={(p) => {
                setEditingProduct(p)
                setIsModalOpen(true)
              }}
            />
          )}

          {/* TAB 3: FACTORIES VIEW */}
          {currentTab === 'factories' && (
            <AdminFactoryView
              products={products}
              factories={factories}
              onAddNewFactory={handleAddNewFactory}
            />
          )}

          {/* TAB 4: CLIENTS VIEW */}
          {currentTab === 'customers' && (
            <AdminCustomerView
              products={products}
              customers={customers}
              onAddNewCustomer={handleAddNewCustomer}
            />
          )}

          {/* TAB 5: ANALYTICS & MARGINS */}
          {currentTab === 'analytics' && <AdminAnalyticsView products={products} />}

          {/* TAB 6: MASTER DATABASE SETTINGS */}
          {currentTab === 'database' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Master Database & System Persistence
                </h2>
                <p className="text-xs text-slate-500">
                  Control product records, local browser persistence cache, and export data.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    CSV Data Export
                  </h3>
                  <p className="text-xs text-slate-600">
                    Download the entire 44-field specification database as an Excel-compatible CSV file.
                  </p>
                  <button
                    onClick={handleExportCsv}
                    className="mt-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FiDownload size={14} />
                    <span>Download Full CSV Export</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Reset Sample Demo Data
                  </h3>
                  <p className="text-xs text-slate-600">
                    Restore the product catalog back to default demo entries (including Floral Maxi Dress ST-1001).
                  </p>
                  <button
                    onClick={handleResetData}
                    className="mt-2 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FiRotateCcw size={14} />
                    <span>Reset Demo Records</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
        existingProducts={products}
        factories={factories}
        customers={customers}
        onAddNewFactory={handleAddNewFactory}
        onAddNewCustomer={handleAddNewCustomer}
      />

      {/* Product Detail Spec Sheet Modal */}
      <AdminProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setDetailProduct(null)
        }}
        product={detailProduct}
        onEdit={(p) => {
          setIsDetailOpen(false)
          setEditingProduct(p)
          setIsModalOpen(true)
        }}
      />
    </div>
  )
}
