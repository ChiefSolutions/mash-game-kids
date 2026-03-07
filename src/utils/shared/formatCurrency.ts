import type { FormatCurrency } from './types.ts'

export const formatCurrency: FormatCurrency = (amount: string) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(Number(amount))
}
