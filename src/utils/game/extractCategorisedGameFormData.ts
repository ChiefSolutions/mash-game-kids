import type { CategoryMapValue, ExtractCategorisedGameFormData } from './types.ts'
import type { MashGameCategories, MashGameCategoryItem } from '@/components/game/types.ts'

export const extractCategorisedGameFormData: ExtractCategorisedGameFormData = (form, extra) => {
  const formData = new FormData(form)
  const entries: FormDataIterator<[string, FormDataEntryValue]> = formData.entries()
  const categoryMap = new Map<string, CategoryMapValue>()

  const result: Record<keyof MashGameCategories, MashGameCategoryItem[]> = {
    accommodation: [],
    partner: [],
    children: [],
    job: [],
    salary: [],
    car: [],
    location: [],
  }

  if (extra) {
    result[extra.name] = extra.value
  }

  form.querySelectorAll<HTMLInputElement>('[data-category]').forEach((el) => {
    if (el?.name) {
      categoryMap.set(el.name, { id: el.id, category: el.dataset.category as string })
    }
  })

  for (const [name, value] of entries) {
    const mappedCategory = categoryMap.get(name) as CategoryMapValue

    if (!result[mappedCategory.category]) {
      result[mappedCategory.category] = []
    }
    result[mappedCategory.category]?.push({ id: mappedCategory.id, value: value as string })
  }

  return result as MashGameCategories
}
