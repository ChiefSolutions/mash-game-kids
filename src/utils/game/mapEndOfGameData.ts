import type { MashGameResults } from '@/components/game/types.ts'
import type { MapEndOfGameData, MashGameItem } from './types.ts'

export const mapEndOfGameData: MapEndOfGameData = (categories, items) => {
  const result: MashGameResults = {
    accommodation: '',
    car: '',
    children: '',
    job: '',
    location: '',
    partner: '',
    salary: '',
  }

  categories.forEach((category: keyof MashGameResults | string) => {
    const foundItem = items.find((i: MashGameItem) => i.category === category && !i.removed)

    if (foundItem) {
      result[category as keyof MashGameResults] = foundItem.value
    }
  })

  return result
}
