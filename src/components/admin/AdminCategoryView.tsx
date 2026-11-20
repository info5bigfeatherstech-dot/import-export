import { useState, useMemo } from 'react'
import type { FormEvent } from 'react'
import type { ApiCategory } from '../../lib/api'
import type { AdminProduct } from '../../types/adminProduct'
import { api } from '../../lib/api'
import { flattenCategories } from '../../utils/categoryUtils'
import {
  FiFolder,
  FiPlus,
  FiChevronRight,
  FiChevronDown,
  FiSearch,
  FiGrid,
  FiList,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
  FiPackage,
  FiX,
  FiCheckCircle,
  FiLayers,
  FiGitCommit,
  FiExternalLink,
} from 'react-icons/fi'

interface AdminCategoryViewProps {
  categories: ApiCategory[]
  products: AdminProduct[]
  onRefreshCategories: () => Promise<void>
  onViewProduct?: (product: AdminProduct) => void
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void
}

export default function AdminCategoryView({
  categories,
  products,
  onRefreshCategories,
  onViewProduct,
  showToast,
}: AdminCategoryViewProps) {
  // View states
  const [viewMode, setViewMode] = useState<'tree' | 'table' | 'cards'>('tree')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRootFilter, setSelectedRootFilter] = useState<string>('all')
  const [selectedDepthFilter, setSelectedDepthFilter] = useState<string>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Expanded tree nodes (record of category id -> boolean)
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(() => {
    // Default: expand all root nodes
    const initial: Record<string, boolean> = {}
    categories.forEach((cat) => {
      initial[cat.id] = true
    })
    return initial
  })

  // Selected Category Detail Drawer/Modal
  const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null)

  // Add / Edit Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ApiCategory | null>(null)
  const [formName, setFormName] = useState('')
  const [formParentId, setFormParentId] = useState<string>('')
  const [formDescription, setFormDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete confirmation
  const [categoryToDelete, setCategoryToDelete] = useState<ApiCategory | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Flattened categories for fast lookup and table view
  const allCategories = useMemo(() => {
    return flattenCategories(categories)
  }, [categories])

  // Category map for quick parent resolution
  const categoryMap = useMemo(() => {
    const map = new Map<string, ApiCategory>()
    allCategories.forEach((c) => map.set(c.id, c))
    return map
  }, [allCategories])

  // Top KPIs
  const rootCategories = useMemo(() => {
    return categories.filter((c) => !c.parentId || c.depth === 0)
  }, [categories])

  const subCategoriesCount = useMemo(() => {
    return allCategories.filter((c) => (c.depth ?? 0) > 0).length
  }, [allCategories])

  const categoriesWithProductsCount = useMemo(() => {
    return allCategories.filter((c) => (c.productCount ?? 0) > 0).length
  }, [allCategories])

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await onRefreshCategories()
      showToast('Category hierarchy refreshed from server')
    } catch {
      showToast('Failed to refresh categories', 'error')
    } finally {
      setIsRefreshing(false)
    }
  }

  // Toggle tree node expansion
  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const expandAll = () => {
    const all: Record<string, boolean> = {}
    allCategories.forEach((c) => {
      all[c.id] = true
    })
    setExpandedNodes(all)
  }

  const collapseAll = () => {
    setExpandedNodes({})
  }

  // Filtered categories for Flat Table & Search
  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchesName = cat.name.toLowerCase().includes(query)
        const matchesSlug = cat.slug.toLowerCase().includes(query)
        const matchesPath = cat.path?.toLowerCase().includes(query)
        if (!matchesName && !matchesSlug && !matchesPath) return false
      }

      // Root Filter
      if (selectedRootFilter !== 'all') {
        const pathRoot = cat.path ? cat.path.split(' / ')[0] : cat.name
        if (pathRoot !== selectedRootFilter) return false
      }

      // Depth Filter
      if (selectedDepthFilter !== 'all') {
        const targetDepth = parseInt(selectedDepthFilter, 10)
        if ((cat.depth ?? 0) !== targetDepth) return false
      }

      return true
    })
  }, [allCategories, searchQuery, selectedRootFilter, selectedDepthFilter])

  // Open Create Modal
  const openCreateModal = (defaultParentId?: string) => {
    setEditingCategory(null)
    setFormName('')
    setFormParentId(defaultParentId || '')
    setFormDescription('')
    setIsFormModalOpen(true)
  }

  // Open Edit Modal
  const openEditModal = (cat: ApiCategory) => {
    setEditingCategory(cat)
    setFormName(cat.name)
    setFormParentId(cat.parentId || '')
    setFormDescription(cat.description || '')
    setIsFormModalOpen(true)
  }

  // Submit Create or Edit
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return

    setIsSubmitting(true)
    try {
      const payload = {
        name: formName.trim(),
        description: formDescription.trim(),
        parentId: formParentId || null,
      }

      if (editingCategory) {
        await api.categories.update(editingCategory.id, payload)
        showToast(`Category "${payload.name}" updated successfully`)
      } else {
        await api.categories.create(payload)
        showToast(`Category "${payload.name}" created successfully`)
      }

      setIsFormModalOpen(false)
      await onRefreshCategories()
    } catch (err: any) {
      showToast(err.message || 'Error saving category', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete Category
  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return
    setIsDeleting(true)
    try {
      await api.categories.delete(categoryToDelete.id)
      showToast(`Category "${categoryToDelete.name}" deleted`)
      setCategoryToDelete(null)
      if (selectedCategory?.id === categoryToDelete.id) {
        setSelectedCategory(null)
      }
      await onRefreshCategories()
    } catch (err: any) {
      showToast(err.message || 'Failed to delete category', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  // Products linked to selected category
  const linkedProducts = useMemo(() => {
    if (!selectedCategory) return []
    const catNameLower = selectedCategory.name.toLowerCase()
    const catSlugLower = selectedCategory.slug.toLowerCase()
    return products.filter((p) => {
      const prodCat = (p.category || '').toLowerCase()
      const prodSub = (p.subcategory || '').toLowerCase()
      return prodCat === catNameLower || prodSub === catNameLower || prodCat === catSlugLower
    })
  }, [selectedCategory, products])

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb Context */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-navy/5 text-navy border border-navy/15">
              <FiFolder size={18} />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Category Hierarchy & Master Taxonomy
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse, manage, and explore all {allCategories.length} categories synchronized with your backend API.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Reload from API"
          >
            <FiRefreshCw size={13} className={isRefreshing ? 'animate-spin text-navy' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh API'}</span>
          </button>

          <button
            onClick={() => openCreateModal()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <FiPlus size={14} />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Categories</span>
            <FiFolder className="text-navy" size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900">{allCategories.length}</div>
          <div className="text-xs text-slate-500 mt-1">Active in MongoDB</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Root Families</span>
            <FiLayers className="text-amber-600" size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900">{rootCategories.length}</div>
          <div className="text-xs text-slate-500 mt-1">
            {rootCategories.map((r) => r.name).join(', ')}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Subcategories</span>
            <FiGitCommit className="text-emerald-600" size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900">{subCategoriesCount}</div>
          <div className="text-xs text-slate-500 mt-1">Level 1 & Level 2 depths</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">With Catalog Items</span>
            <FiPackage className="text-sky-600" size={16} />
          </div>
          <div className="text-2xl font-bold text-slate-900">{categoriesWithProductsCount}</div>
          <div className="text-xs text-slate-500 mt-1">Assigned live products</div>
        </div>
      </div>

      {/* Filter and View Toggle Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category name, path, or slug..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-navy focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <FiX size={13} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Root Family Filter */}
          <select
            value={selectedRootFilter}
            onChange={(e) => setSelectedRootFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-navy text-slate-700 cursor-pointer"
          >
            <option value="all">All Root Families</option>
            {rootCategories.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name} ({r.children?.length ?? 0} sub)
              </option>
            ))}
          </select>

          {/* Depth Level Filter */}
          <select
            value={selectedDepthFilter}
            onChange={(e) => setSelectedDepthFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-navy text-slate-700 cursor-pointer"
          >
            <option value="all">All Depth Levels</option>
            <option value="0">Root Level (Depth 0)</option>
            <option value="1">Subcategories (Depth 1)</option>
            <option value="2">Deep Subcategories (Depth 2)</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('tree')}
              title="Tree Hierarchy View"
              className={`px-2.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'tree'
                  ? 'bg-white text-navy shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FiLayers size={13} />
              <span>Tree</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Flat Table View"
              className={`px-2.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-navy shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FiList size={13} />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              title="Cards Grid View"
              className={`px-2.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-navy shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FiGrid size={13} />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: HIERARCHY TREE VIEW */}
      {viewMode === 'tree' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Tree Toolbar */}
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
            <div className="text-slate-600 font-medium flex items-center gap-2">
              <span className="font-semibold text-slate-800">Hierarchical Structure</span>
              <span>•</span>
              <span>Showing {categories.length} Root Groups</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={expandAll}
                className="text-navy hover:underline font-semibold cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={collapseAll}
                className="text-slate-600 hover:underline font-semibold cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Tree Content */}
          <div className="p-4 divide-y divide-slate-100">
            {categories.map((rootCategory) => {
              // Apply Root Filter if set
              if (selectedRootFilter !== 'all' && rootCategory.name !== selectedRootFilter) {
                return null
              }

              return (
                <TreeNode
                  key={rootCategory.id}
                  node={rootCategory}
                  level={0}
                  expandedNodes={expandedNodes}
                  onToggleNode={toggleNode}
                  onSelectCategory={setSelectedCategory}
                  onEditCategory={openEditModal}
                  onDeleteCategory={setCategoryToDelete}
                  onAddChild={(parentId) => openCreateModal(parentId)}
                  searchQuery={searchQuery}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FLAT TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Category Name</th>
                  <th className="py-3 px-3">Depth Level</th>
                  <th className="py-3 px-4">Full Path</th>
                  <th className="py-3 px-3">URL Slug</th>
                  <th className="py-3 px-3 text-center">Subcategories</th>
                  <th className="py-3 px-3 text-center">Products</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No categories found matching your search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => {
                    const depth = cat.depth ?? 0
                    return (
                      <tr
                        key={cat.id}
                        className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2">
                            <FiFolder
                              size={15}
                              className={
                                depth === 0
                                  ? 'text-amber-500'
                                  : depth === 1
                                  ? 'text-sky-500'
                                  : 'text-emerald-500'
                              }
                            />
                            <span>{cat.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              depth === 0
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : depth === 1
                                ? 'bg-sky-50 text-sky-700 border-sky-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {depth === 0
                              ? 'Root (Level 0)'
                              : depth === 1
                              ? 'Sub (Level 1)'
                              : 'Deep (Level 2)'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          {cat.path || cat.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                          {cat.slug}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-semibold text-slate-700">
                            {cat.childCount ?? cat.children?.length ?? 0}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              (cat.productCount ?? 0) > 0
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {cat.productCount ?? 0}
                          </span>
                        </td>
                        <td
                          className="py-3 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedCategory(cat)}
                              title="View Category Details"
                              className="p-1.5 text-slate-400 hover:text-navy hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            >
                              <FiEye size={13} />
                            </button>
                            <button
                              onClick={() => openEditModal(cat)}
                              title="Edit Category"
                              className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                            >
                              <FiEdit2 size={13} />
                            </button>
                            <button
                              onClick={() => setCategoryToDelete(cat)}
                              title="Delete Category"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: CARDS GRID VIEW */}
      {viewMode === 'cards' && (
        <div className="space-y-6">
          {categories.map((rootCategory) => {
            if (selectedRootFilter !== 'all' && rootCategory.name !== selectedRootFilter) {
              return null
            }

            return (
              <div
                key={rootCategory.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden"
              >
                {/* Root Card Header */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center font-bold text-base shadow-xs">
                      {rootCategory.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {rootCategory.name} Family
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Root Domain
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Slug: {rootCategory.slug} • Subcategories: {rootCategory.children?.length ?? 0}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openCreateModal(rootCategory.id)}
                      className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <FiPlus size={13} />
                      <span>Add Subcategory</span>
                    </button>
                    <button
                      onClick={() => setSelectedCategory(rootCategory)}
                      className="px-3 py-1.5 bg-navy hover:bg-navy-light text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <FiEye size={13} />
                      <span>Family Details</span>
                    </button>
                  </div>
                </div>

                {/* Direct Children Grid */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rootCategory.children && rootCategory.children.length > 0 ? (
                    rootCategory.children.map((child) => (
                      <div
                        key={child.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-navy/30 hover:shadow-sm transition-all group cursor-pointer"
                        onClick={() => setSelectedCategory(child)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <FiFolder className="text-sky-600" size={16} />
                            <span className="text-xs font-bold text-slate-900 group-hover:text-navy">
                              {child.name}
                            </span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                            {child.children?.length ?? 0} items
                          </span>
                        </div>

                        <div className="mt-2 text-[11px] text-slate-500 font-mono truncate">
                          {child.path}
                        </div>

                        {/* Child styles teaser */}
                        {child.children && child.children.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                            {child.children.slice(0, 3).map((grandChild) => (
                              <span
                                key={grandChild.id}
                                className="text-[10px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 truncate max-w-[140px]"
                              >
                                {grandChild.name}
                              </span>
                            ))}
                            {child.children.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                                +{child.children.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-between text-xs pt-2">
                          <span className="text-[11px] text-slate-500">
                            Products: <strong>{child.productCount ?? 0}</strong>
                          </span>
                          <span className="text-navy font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            View <FiChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-xs text-slate-400">
                      No subcategories configured under {rootCategory.name}.
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ================= CATEGORY DETAIL MODAL / DRAWER ================= */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-none animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy/5 text-navy border border-navy/20 flex items-center justify-center font-bold">
                  <FiFolder size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {selectedCategory.name}
                    </h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Depth {selectedCategory.depth ?? 0}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    ID: {selectedCategory.id}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Properties Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">
                    Breadcrumb Path
                  </span>
                  <span className="font-mono text-slate-800 font-semibold mt-1 block">
                    {selectedCategory.path || selectedCategory.name}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">
                    URL Slug
                  </span>
                  <span className="font-mono text-slate-800 font-semibold mt-1 block">
                    {selectedCategory.slug}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">
                    Parent Category
                  </span>
                  <span className="text-slate-800 font-semibold mt-1 block">
                    {selectedCategory.parentId
                      ? categoryMap.get(selectedCategory.parentId)?.name ||
                        selectedCategory.parentId
                      : 'None (Root Category)'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">
                    Subcategories Count
                  </span>
                  <span className="text-slate-800 font-semibold mt-1 block">
                    {selectedCategory.childCount ?? selectedCategory.children?.length ?? 0} subcategories
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Description
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedCategory.description || 'No description entered for this category.'}
                </p>
              </div>

              {/* Child Subcategories */}
              {selectedCategory.children && selectedCategory.children.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Direct Child Subcategories ({selectedCategory.children.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory.children.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedCategory(ch)}
                        className="px-3 py-1.5 bg-slate-50 hover:bg-navy/5 hover:border-navy/20 border border-slate-200 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FiFolder size={12} className="text-sky-500" />
                        <span>{ch.name}</span>
                        <span className="text-[10px] text-slate-400">
                          ({ch.children?.length ?? 0})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Linked Catalog Products */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Associated Store Products ({linkedProducts.length})
                  </span>
                </div>

                {linkedProducts.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    No products currently mapped to "{selectedCategory.name}".
                  </div>
                ) : (
                  <div className="space-y-2">
                    {linkedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.productImage || 'https://placehold.co/40x40/f1f5f9/94a3b8?text=Style'}
                            alt={p.productName}
                            className="w-9 h-9 object-cover rounded-lg border border-slate-200"
                          />
                          <div>
                            <div className="font-semibold text-slate-900">{p.productName}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Code: {p.productCode} • SKU: {p.sku} • Price: ${p.salePrice}
                            </div>
                          </div>
                        </div>

                        {onViewProduct && (
                          <button
                            onClick={() => {
                              setSelectedCategory(null)
                              onViewProduct(p)
                            }}
                            className="px-2.5 py-1 text-[11px] font-semibold text-navy hover:bg-navy/5 rounded-lg border border-navy/20 cursor-pointer flex items-center gap-1"
                          >
                            <span>View Product</span>
                            <FiExternalLink size={11} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  setCategoryToDelete(selectedCategory)
                }}
                className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <FiTrash2 size={13} />
                <span>Delete Category</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(selectedCategory)}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <FiEdit2 size={13} />
                  <span>Edit Details</span>
                </button>
                <button
                  onClick={() => openCreateModal(selectedCategory.id)}
                  className="px-4 py-2 bg-navy hover:bg-navy-light text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <FiPlus size={13} />
                  <span>Add Child Subcategory</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-none animate-in fade-in duration-150">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                {editingCategory ? `Edit "${editingCategory.name}"` : 'Create New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Athleisure, Winter Jackets, Coffee Makers..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-navy focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Parent Category (Hierarchy Level)
                </label>
                <select
                  value={formParentId}
                  onChange={(e) => setFormParentId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-navy focus:bg-white text-slate-800"
                >
                  <option value="">None (Top-Level Root Domain)</option>
                  {allCategories
                    .filter((c) => !editingCategory || c.id !== editingCategory.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.path || c.name}
                      </option>
                    ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Leave as "None" to create a main root category, or select a parent to nest as a subcategory.
                </p>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Optional brief notes or specifications for this classification..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-navy focus:bg-white resize-none"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-navy hover:bg-navy-light text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <FiCheckCircle size={13} />
                <span>{isSubmitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-none animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
              <FiTrash2 size={22} />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-900">Delete Category</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to permanently delete category{' '}
                <strong className="text-slate-800">"{categoryToDelete.name}"</strong>?
              </p>
              {categoryToDelete.children && categoryToDelete.children.length > 0 && (
                <div className="mt-2 text-rose-600 text-xs font-semibold bg-rose-50 p-2 rounded-lg border border-rose-100">
                  Warning: This category contains {categoryToDelete.children.length} subcategories!
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCategory}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Recursive TreeNode component for Hierarchical Tree View
 */
interface TreeNodeProps {
  node: ApiCategory
  level: number
  expandedNodes: Record<string, boolean>
  onToggleNode: (id: string) => void
  onSelectCategory: (node: ApiCategory) => void
  onEditCategory: (node: ApiCategory) => void
  onDeleteCategory: (node: ApiCategory) => void
  onAddChild: (parentId: string) => void
  searchQuery: string
}

function TreeNode({
  node,
  level,
  expandedNodes,
  onToggleNode,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
  onAddChild,
  searchQuery,
}: TreeNodeProps) {
  const isExpanded = !!expandedNodes[node.id]
  const hasChildren = node.children && node.children.length > 0
  const childCount = node.childCount ?? node.children?.length ?? 0

  // Filter highlighting if matches search query
  const isMatch =
    searchQuery.trim().length > 0 &&
    (node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.slug.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="select-none py-1">
      <div
        className={`flex items-center justify-between p-2 rounded-xl transition-colors group cursor-pointer ${
          isMatch
            ? 'bg-amber-50 border border-amber-200'
            : 'hover:bg-slate-50 border border-transparent'
        }`}
        style={{ paddingLeft: `${level * 24 + 10}px` }}
        onClick={() => onSelectCategory(node)}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Caret Button */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleNode(node.id)
              }}
              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
            </button>
          ) : (
            <span className="w-5 h-5 flex items-center justify-center text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </span>
          )}

          {/* Folder Icon */}
          <FiFolder
            size={16}
            className={
              level === 0
                ? 'text-amber-500 shrink-0'
                : level === 1
                ? 'text-sky-500 shrink-0'
                : 'text-emerald-500 shrink-0'
            }
          />

          {/* Category Name */}
          <span className={`text-xs font-semibold truncate ${
            level === 0 ? 'text-slate-900 font-bold' : 'text-slate-800'
          }`}>
            {node.name}
          </span>

          {/* Subcategory badge */}
          {childCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-500 font-medium">
              {childCount} sub
            </span>
          )}

          {/* Active Product count */}
          {(node.productCount ?? 0) > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {node.productCount} styles
            </span>
          )}

          {/* Path preview */}
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline-block truncate max-w-[200px]">
            {node.path || node.slug}
          </span>
        </div>

        {/* Action icons */}
        <div
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onAddChild(node.id)}
            title="Add Subcategory"
            className="p-1 text-slate-400 hover:text-navy hover:bg-slate-100 rounded cursor-pointer"
          >
            <FiPlus size={13} />
          </button>
          <button
            onClick={() => onSelectCategory(node)}
            title="View Details"
            className="p-1 text-slate-400 hover:text-navy hover:bg-slate-100 rounded cursor-pointer"
          >
            <FiEye size={13} />
          </button>
          <button
            onClick={() => onEditCategory(node)}
            title="Edit Category"
            className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded cursor-pointer"
          >
            <FiEdit2 size={13} />
          </button>
          <button
            onClick={() => onDeleteCategory(node)}
            title="Delete Category"
            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

      {/* Recursive children if expanded */}
      {isExpanded && hasChildren && (
        <div className="relative">
          {/* Vertical lineage guide line */}
          <div
            className="absolute top-0 bottom-0 border-l border-slate-200"
            style={{ left: `${level * 24 + 20}px` }}
          />

          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              onToggleNode={onToggleNode}
              onSelectCategory={onSelectCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              onAddChild={onAddChild}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  )
}
