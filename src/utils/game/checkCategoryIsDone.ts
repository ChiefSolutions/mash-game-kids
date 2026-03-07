import type { CheckCategoryIsDone } from './types.ts'

export const checkCategoryIsDone: CheckCategoryIsDone = (items, categories) => {
  return categories.every((cat) => {
    const catItems = items.filter((i) => i.category === cat)
    return catItems.filter((i) => i.removed).length === catItems.length - 1
  })
}
