import { clsx } from 'clsx'

export function Input({ className, type, ...props }) {
  const invalid = props['aria-invalid'] === true || props['aria-invalid'] === 'true'

  return (
    <input
      type={type}
      data-slot="input"
      className={clsx('form-control', invalid && 'is-invalid', className)}
      {...props}
    />
  )
}
