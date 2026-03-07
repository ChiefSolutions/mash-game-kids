import type { MashGameItem } from './types.ts'

// export const getNextItem = (items: MashGameItem[], pointer: number) => {
//   const active = items.map((item, idx) => ({ item, idx })).filter(({ item }) => !item.removed)
//
//   if (!active.length) return null
//
//   let nextPos = active.findIndex(({ idx }) => idx > pointer)
//   if (nextPos === -1) nextPos = 0
//
//   return active[nextPos]
// }

export const getNextItem = (items: MashGameItem[], pointer: number) => {
  // Get count for items that have not been removed from the category
  const categoryCount = items.reduce(
    (acc, item) => {
      if (!item.removed) {
        acc[item.category] = (acc[item.category] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  // Active items that have not been removed
  const active = items
    .map((item, idx) => {
      return { item, idx }
    })
    .filter(({ item }) => {
      return !item.removed && categoryCount[item.category]! > 1
    })

  if (!active.length) return null

  let nextPos = active.findIndex(({ idx }) => idx > pointer)
  if (nextPos === -1) nextPos = 0

  return active[nextPos]
}
