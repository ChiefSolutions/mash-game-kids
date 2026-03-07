import type { GetChildOrChildren } from './types.ts'

export const getChildOrChildren: GetChildOrChildren = (count) => {
  return Number(count) > 1 ? 'children' : 'child'
}
