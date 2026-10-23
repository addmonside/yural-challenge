export function Price({ as, className, value }) {
  const Comp = as ?? 'p'
  return <Comp className={className}>{formatter.format(value)}</Comp>
}

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
