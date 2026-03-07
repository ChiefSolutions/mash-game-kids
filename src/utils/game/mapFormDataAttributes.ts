import type { MapFormDataAttributes } from './types.ts'

export const mapFormDataAttributes: MapFormDataAttributes = (attrs?: Record<string, string>) => {
  if (attrs) {
    const result: Record<string, string> = {}

    for (const key in attrs) {
      result[`data-${key}`] = attrs[key] as string
    }

    return result
  }

  return null
}
