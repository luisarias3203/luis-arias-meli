import { PriceProps } from './definitions'

/**
 * Formats a price value based on the provided currency, amount, and decimal places.
 * @param {PriceProps} props - The properties including currency, amount, and decimals to format the price.
 * @returns {string} The formatted price as a string in the specified currency and locale format.
 */
export const FormatPrice = (props: PriceProps) => {
  const { currency, amount, decimals } = props
  const fullAmount = Number(`${amount}.${decimals}`)

  const formattedAmount = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(fullAmount)

  return formattedAmount
}
