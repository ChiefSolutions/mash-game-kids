import type { MashGameCategories, MashGameResults } from '@/components/game/types.ts'
import { getItems } from './getItems.ts'
import { getNextItem } from './getNextItem.ts'
import { checkCategoryIsDone } from './checkCategoryIsDone.ts'
import type { MashGameItem, PlayGame, VisualRef } from '@/utils/game/types.ts'
import type { Ref } from 'vue'
import { mapEndOfGameData } from '@/utils'

const MAX_GAME_STEPS_OFF_SET = 255

// export const playGame = (game: MashGameCategories, magicNumber: number, visualRef: Ref<VisualRef, VisualRef>) => {
//   const items = getItems(game)
//   const categories = Object.keys(game)
//   let steps = []
//   let pointer = -1
//   let count = 0
//   let endOfGame = false
//
//   while (!checkCategoryIsDone(items, categories)) {
//     const next = getNextItem(items, pointer)
//
//     endOfGame = steps.length === MAX_GAME_STEPS_OFF_SET
//
//     if (!next || endOfGame) {
//       break
//     }
//
//     pointer = next.idx
//     count++
//
//     visualRef.value.highlightId = items[pointer]!.id
//     steps.push({ type: 'count', itemIndex: pointer, count })
//
//     if (count % magicNumber === 0) {
//       const cat = items[pointer]?.category
//       const remaining = items.filter((i) => i.category === cat && !i.removed)
//
//       if (remaining.length > 1) {
//         items[pointer]!.removed = true
//         steps.push({ type: 'remove', itemIndex: pointer })
//         visualRef.value.removedIds.push(items[pointer]!.id)
//       } else {
//         visualRef.value.selectedIds.push(items[pointer]!.id)
//       }
//     }
//
//     if (endOfGame) {
//       steps = []
//       pointer = -1
//       count = 0
//       endOfGame = false
//     }
//   }
//
//   return mapEndOfGameData(categories, items)
// }

export const playGame: PlayGame = (game, magicNumber, visualRef, onComplete) => {
  const items = getItems(game)
  const categories = Object.keys(game)
  const steps: { type: 'count' | 'remove'; itemIndex: number; count?: number }[] = []
  let pointer = -1
  let count = 0

  // First Phase: compute all steps upfront, no visualRef mutations yet
  while (!checkCategoryIsDone(items, categories)) {
    const next = getNextItem(items, pointer)
    if (!next || steps.length >= MAX_GAME_STEPS_OFF_SET) {
      break
    }

    pointer = next.idx
    count++

    steps.push({ type: 'count', itemIndex: pointer, count })

    if (count % magicNumber === 0) {
      const cat = items[pointer]!.category
      const remaining = items.filter((i) => i.category === cat && !i.removed)

      if (remaining.length > 1) {
        items[pointer]!.removed = true
        steps.push({ type: 'remove', itemIndex: pointer })
      }
    }
  }

  const endResult = mapEndOfGameData(categories, items)

  // Second Phase: replay steps one at a time via setTimeout
  const replaySteps = (index: number) => {
    if (index >= steps.length) {
      // Get survivors - final selections
      categories.forEach((cat) => {
        const survivor = items.find((i) => i.category === cat && !i.removed)
        if (survivor) {
          visualRef.value.selectedIds.push(survivor.id)
        }
      })
      onComplete(endResult)
      return
    }

    const step = steps[index]

    if (step?.type === 'count') {
      visualRef.value.highlightId = items[step.itemIndex]!.id
      setTimeout(() => replaySteps(index + 1), 500)
    }

    if (step?.type === 'remove') {
      visualRef.value.removedIds.push(items[step.itemIndex]!.id)
      visualRef.value.highlightId = null
      setTimeout(() => replaySteps(index + 1), 400)
    }
  }

  replaySteps(0)
}
