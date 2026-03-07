import type { MashGameCategories } from '@/components/game/types.ts'
import type { GetItems, MashGameItem } from './types.ts'

export const getItems: GetItems = (game: MashGameCategories) => {
  return Object.entries(game).flatMap(([category, options]: [string, { id: string; value: string }[]]) => {
    return options.map((option) => {
      return {
        id: option.id,
        value: option.value,
        category,
        removed: false,
      }
    })
  }) as MashGameItem[]
}
