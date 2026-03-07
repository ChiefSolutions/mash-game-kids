import type { MashGameCategories, MashGameResults } from '@/components/game/types.ts'
import type { Ref } from 'vue'

export interface MashGameItem {
  id: string
  value: string
  category: string
  removed: boolean
}

export interface VisualRef {
  removedIds: string[]
  selectedIds: string[]
  highlightId: string | null
}

export interface CategoryMapValue {
  id: string
  category: string
}

export type ExtractCategorisedGameFormData = (
  form: HTMLFormElement,
  extra?: { name: 'accommodation'; value: { id: string; value: string }[] },
) => MashGameCategories

export type OnSubmitForm = (e: SubmitEvent) => void
export type OnFormReset = () => void

export type GetItems = (game: MashGameCategories) => MashGameItem[]

export type CheckCategoryIsDone = (items: MashGameItem[], categories: string[]) => boolean

export type GetMagicNumber = (min?: number, max?: number) => number

export type MapFormDataAttributes = (attrs?: Record<string, string>) => Record<string, string> | null

export type GetChildOrChildren = (count: string) => string

export type MapEndOfGameData = (categories: string[], items: MashGameItem[]) => MashGameResults

export type PlayGame = (
  game: MashGameCategories,
  magicNumber: number,
  visualRef: Ref<VisualRef, VisualRef>,
  onComplete: (result: MashGameResults) => void,
) => void
