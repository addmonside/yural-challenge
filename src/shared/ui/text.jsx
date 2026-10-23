export function Text({ as, className, value }) {
  const Comp = as ?? 'p'
  return <Comp className={className}>{formatter.format(value)}</Comp>
}
