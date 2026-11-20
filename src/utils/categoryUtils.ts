import type { ApiCategory } from '../lib/api'

/**
 * Recursively flattens a category tree into a single array
 */
export function flattenCategories(categories: ApiCategory[]): ApiCategory[] {
  const result: ApiCategory[] = []

  function traverse(list: ApiCategory[]) {
    for (const item of list) {
      result.push(item)
      if (item.children && item.children.length > 0) {
        traverse(item.children)
      }
    }
  }

  traverse(categories)
  return result
}

/**
 * Returns total count of categories in the tree
 */
export function countAllCategories(categories: ApiCategory[]): number {
  return flattenCategories(categories).length
}

/**
 * Find category by ID in recursive tree
 */
export function findCategoryById(
  categories: ApiCategory[],
  id: string
): ApiCategory | null {
  for (const cat of categories) {
    if (cat.id === id) return cat
    if (cat.children && cat.children.length > 0) {
      const found = findCategoryById(cat.children, id)
      if (found) return found
    }
  }
  return null
}
