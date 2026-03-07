export interface MashGameCategoryItem {
  id: string
  value: string
}

export interface MashGameCategories {
  accommodation: MashGameCategoryItem[]
  car: MashGameCategoryItem[]
  children: MashGameCategoryItem[]
  job: MashGameCategoryItem[]
  location: MashGameCategoryItem[]
  partner: MashGameCategoryItem[]
  salary: MashGameCategoryItem[]
  [key: string]: MashGameCategoryItem[]
}

export interface MashGameResults {
  accommodation: string
  car: string
  children: string
  job: string
  location: string
  partner: string
  salary: string
}

export interface MashGameResultProps {
  result: MashGameResults
  onClose: () => void
}

export type MashGameFacilityProps = VisualFeedbackProps

export interface VisualFeedbackProps {
  removed?: string[]
  selected?: string[]
  highlightId?: string | null
}
