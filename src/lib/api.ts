/**
 * ShivaSun Moderno / Maya Exports API Client
 * Connects directly to backend at VITE_PUBLIC_API_URL (http://localhost:5000/api)
 */

export const API_TARGET_URL: string =
  (import.meta.env.VITE_PUBLIC_API_URL as string) || 'http://localhost:5000/api'

// In the browser, use the Vite proxy '/api' to automatically handle CORS and trusted origin
export const API_BASE_URL: string =
  typeof window !== 'undefined' ? '/api' : API_TARGET_URL

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  meta?: any
}

export interface AdminUser {
  id: string
  email: string
}

export interface ApiCategory {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string | null
  path?: string
  depth?: number
  productCount?: number
  childCount?: number
  createdAt?: string
  updatedAt?: string
  children?: ApiCategory[]
}

export interface ApiFactory {
  id: string
  code: string
  name: string
  country?: string
  city?: string
  contactPerson?: string
  phone?: string
}

export interface ApiCustomer {
  id: string
  code: string
  name: string
  country?: string
  tier?: string
  primaryContact?: string
  email?: string
}

export interface DashboardSummary {
  totalProducts: number
  activeProducts: number
  inactiveProducts: number
  totalCategories: number
  readyStockProducts: number
  readyStockTotalUnits: number
  totalFactories: number
  totalCustomers: number
  newProductsThisMonth: number
}

class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
  
  const headers = new Headers(options.headers || {})
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  // Include credentials for the HTTP-only auth cookie
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  let json: any
  try {
    json = await response.json()
  } catch {
    json = {
      success: false,
      message: response.statusText || `Request failed with status ${response.status}`,
    }
  }

  if (!response.ok || json.success === false) {
    const errorMsg = json.message || `API error ${response.status}: ${response.statusText}`
    throw new ApiError(response.status, errorMsg)
  }

  return json as ApiResponse<T>
}

// ----------------- API Methods -----------------

export const api = {
  // Health Check
  health: {
    check: async () => {
      try {
        const res = await request<{ message: string }>('/health', { method: 'GET' })
        return { ok: true, data: res }
      } catch (e: any) {
        return { ok: false, error: e?.message || 'Server unreachable' }
      }
    },
  },

  // Authentication
  auth: {
    login: async (email: string, password: string) => {
      return request<{ admin: AdminUser }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
    },
    logout: async () => {
      return request<null>('/auth/logout', {
        method: 'POST',
      })
    },
    me: async () => {
      return request<{ admin: AdminUser }>('/auth/me', {
        method: 'GET',
      })
    },
  },

  // Admin Dashboard Analytics
  dashboard: {
    getSummary: async () => {
      return request<DashboardSummary>('/admin/dashboard/summary', {
        method: 'GET',
      })
    },
    getCategoryDistribution: async (params?: { range?: string; season?: string }) => {
      const q = new URLSearchParams()
      if (params?.range) q.set('range', params.range)
      if (params?.season) q.set('season', params.season)
      const qs = q.toString() ? `?${q.toString()}` : ''
      return request<any>(`/admin/dashboard/category-distribution${qs}`, {
        method: 'GET',
      })
    },
    getMarketAndBuyerAnalytics: async (params?: { range?: string; season?: string }) => {
      const q = new URLSearchParams()
      if (params?.range) q.set('range', params.range)
      if (params?.season) q.set('season', params.season)
      const qs = q.toString() ? `?${q.toString()}` : ''
      return request<any>(`/admin/dashboard/market-and-buyer-analytics${qs}`, {
        method: 'GET',
      })
    },
    getFactoryWorkload: async () => {
      return request<any>('/admin/dashboard/factory-workload', {
        method: 'GET',
      })
    },
    getInventoryAlerts: async (threshold?: number) => {
      const qs = threshold ? `?threshold=${threshold}` : ''
      return request<any>(`/admin/dashboard/inventory-alerts${qs}`, {
        method: 'GET',
      })
    },
    getRecentActivity: async () => {
      return request<any>('/admin/dashboard/recent-activity', {
        method: 'GET',
      })
    },
  },

  // Products
  products: {
    list: async (params?: {
      category?: string
      search?: string
      includeInactive?: boolean
    }) => {
      const q = new URLSearchParams()
      if (params?.category) q.set('category', params.category)
      if (params?.search) q.set('search', params.search)
      if (params?.includeInactive) q.set('includeInactive', 'true')
      const qs = q.toString() ? `?${q.toString()}` : ''
      return request<any[]>(`/products${qs}`, {
        method: 'GET',
      })
    },
    getById: async (id: string) => {
      return request<any>(`/products/${id}`, {
        method: 'GET',
      })
    },
    create: async (payload: any) => {
      return request<any>('/products', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    },
    update: async (id: string, payload: any) => {
      return request<any>(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
    },
    delete: async (id: string) => {
      return request<any>(`/products/${id}`, {
        method: 'DELETE',
      })
    },
    downloadTemplate: async () => {
      const res = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/products/import/template`, {
        method: 'GET',
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Failed to download template')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'maya-exports-product-import.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    },
    previewImport: async (sheetFile: File) => {
      const formData = new FormData()
      formData.append('sheet', sheetFile)
      return request<any>('/products/import/preview', {
        method: 'POST',
        body: formData,
      })
    },
    importBulk: async (sheetFile: File, zipFile?: File | null) => {
      const formData = new FormData()
      formData.append('sheet', sheetFile)
      if (zipFile) {
        formData.append('imagesZip', zipFile)
      }
      return request<any>('/products/import', {
        method: 'POST',
        body: formData,
      })
    },
  },

  // Categories
  categories: {
    list: async () => {
      return request<ApiCategory[]>('/categories', {
        method: 'GET',
      })
    },
    getBySlug: async (slug: string) => {
      return request<ApiCategory>(`/categories/by-slug/${slug}`, {
        method: 'GET',
      })
    },
    create: async (data: { name: string; description?: string; parentId?: string | null }) => {
      return request<ApiCategory>('/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update: async (
      id: string,
      data: { name: string; description?: string; parentId?: string | null }
    ) => {
      return request<ApiCategory>(`/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },
    delete: async (id: string) => {
      return request<{ id: string }>(`/categories/${id}`, {
        method: 'DELETE',
      })
    },
  },

  // Factories
  factories: {
    list: async () => {
      return request<ApiFactory[]>('/factories', {
        method: 'GET',
      })
    },
    create: async (data: {
      name: string
      country?: string
      city?: string
      contactPerson?: string
      phone?: string
    }) => {
      return request<ApiFactory>('/factories', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update: async (
      id: string,
      data: {
        name: string
        country?: string
        city?: string
        contactPerson?: string
        phone?: string
      }
    ) => {
      return request<ApiFactory>(`/factories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },
    delete: async (id: string) => {
      return request<{ id: string }>(`/factories/${id}`, {
        method: 'DELETE',
      })
    },
  },

  // Customers
  customers: {
    list: async () => {
      return request<ApiCustomer[]>('/customers', {
        method: 'GET',
      })
    },
    create: async (data: {
      name: string
      country?: string
      tier?: string
      primaryContact?: string
      email?: string
    }) => {
      return request<ApiCustomer>('/customers', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
    update: async (
      id: string,
      data: {
        name: string
        country?: string
        tier?: string
        primaryContact?: string
        email?: string
      }
    ) => {
      return request<ApiCustomer>(`/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    },
    delete: async (id: string) => {
      return request<{ id: string }>(`/customers/${id}`, {
        method: 'DELETE',
      })
    },
  },
}
