import type { GetMagicNumber } from './types.ts'

export const getMagicNumber: GetMagicNumber = (min = 3, max = 10) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
