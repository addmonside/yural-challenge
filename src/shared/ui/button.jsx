import { useMemo } from 'react'

export function Button({ type = 'button', clasName, variant = 'primary', ...props }) {
  const v = useMemo(
    () => (variants.has(variant) ? variants.get(variant) : variants.get('primary')),
    [variant],
  )
  return <button type={type} className={`btn ${v} ${clasName}`} {...props} />
}

const variants = new Map([
  ['primary', 'btn-primary'],
  ['ghost', 'btn-outline-primary'],
])
