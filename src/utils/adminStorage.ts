import type { AdminProduct } from '../types/adminProduct'
import { INITIAL_ADMIN_PRODUCTS, INITIAL_FACTORIES, INITIAL_CUSTOMERS } from '../data/adminInitialData'

const STORAGE_KEY_PRODUCTS = 'shivasun_admin_products_v1'
const STORAGE_KEY_FACTORIES = 'shivasun_admin_factories_v1'
const STORAGE_KEY_CUSTOMERS = 'shivasun_admin_customers_v1'

export function getStoredProducts(): AdminProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to parse stored products:', e)
  }
  return INITIAL_ADMIN_PRODUCTS
}

export function saveStoredProducts(products: AdminProduct[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products))
  } catch (e) {
    console.error('Failed to save products:', e)
  }
}

export function getStoredFactories(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FACTORIES)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (e) {
    console.error(e)
  }
  return INITIAL_FACTORIES.map((f) => f.name)
}

export function saveStoredFactories(factories: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_FACTORIES, JSON.stringify(factories))
  } catch (e) {
    console.error(e)
  }
}

export function getStoredCustomers(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOMERS)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (e) {
    console.error(e)
  }
  return INITIAL_CUSTOMERS.map((c) => c.name)
}

export function saveStoredCustomers(customers: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers))
  } catch (e) {
    console.error(e)
  }
}

/**
 * Auto-generate Factory Code in format: Prefix 'F' + 2-digit current year (e.g. 26) + '-' + 3-digit sequence (e.g. 001) -> F26-001
 */
export function generateFactoryCode(existingProducts: AdminProduct[]): string {
  const currentYearDigits = new Date().getFullYear().toString().slice(-2) // "26"
  const prefix = `F${currentYearDigits}-`
  
  // Find highest sequence among existing codes with matching prefix
  let maxSeq = 0
  existingProducts.forEach((p) => {
    if (p.factoryCode && p.factoryCode.startsWith(prefix)) {
      const numPart = parseInt(p.factoryCode.replace(prefix, ''), 10)
      if (!isNaN(numPart) && numPart > maxSeq) {
        maxSeq = numPart
      }
    }
  })

  const nextSeq = (maxSeq + 1).toString().padStart(3, '0')
  return `${prefix}${nextSeq}`
}

/**
 * Auto-generate Customer Style Code in format: Prefix 'C' + 2-digit current year (e.g. 26) + '-' + 3-digit sequence (e.g. 001) -> C26-001
 */
export function generateCustomerStyleCode(existingProducts: AdminProduct[], _customerName?: string): string {
  const currentYearDigits = new Date().getFullYear().toString().slice(-2) // "26"
  
  // Custom prefix based on customer initial if desired, or standard C
  const prefix = `C${currentYearDigits}-`
  
  let maxSeq = 0
  existingProducts.forEach((p) => {
    if (p.customerStyleCode && p.customerStyleCode.startsWith(prefix)) {
      const numPart = parseInt(p.customerStyleCode.replace(prefix, ''), 10)
      if (!isNaN(numPart) && numPart > maxSeq) {
        maxSeq = numPart
      }
    }
  })

  const nextSeq = (maxSeq + 1).toString().padStart(3, '0')
  return `${prefix}${nextSeq}`
}

/**
 * Compute gross margin and percentage
 */
export function calculateMargin(exw: number | string, salePrice: number | string): {
  profit: number
  marginPercent: number
  markupPercent: number
} {
  const cost = typeof exw === 'number' ? exw : parseFloat(String(exw).replace(/[^0-9.]/g, '')) || 0
  const price = typeof salePrice === 'number' ? salePrice : parseFloat(String(salePrice).replace(/[^0-9.]/g, '')) || 0

  if (price <= 0 || cost <= 0) {
    return { profit: 0, marginPercent: 0, markupPercent: 0 }
  }

  const profit = price - cost
  const marginPercent = Math.round((profit / price) * 1000) / 10
  const markupPercent = Math.round((profit / cost) * 1000) / 10

  return { profit, marginPercent, markupPercent }
}
