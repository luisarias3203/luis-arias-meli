import { PriceProps } from './definitions'

export const getFormatPrice = (props: PriceProps) => {
  const { currency, amount, decimals } = props
  const fullAmount = Number(`${amount}.${decimals}`)

  const formattedAmount = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(fullAmount)

  return formattedAmount
}
