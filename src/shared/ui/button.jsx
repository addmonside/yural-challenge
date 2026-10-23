import { useMemo } from 'react'

export function Button({ type = 'button', className, variant = 'primary', ...props }) {
  const v = useMemo(
    () => (variants.has(variant) ? variants.get(variant) : variants.get('primary')),
    [variant],
  )
  return <button type={type} className={`btn ${v} ${className}`} {...props} />
}

const variants = new Map([
  ['primary', 'btn-primary'],
  ['ghost', 'btn-outline-primary border-0'],
  ['outline', 'btn-outline-primary'],
])
