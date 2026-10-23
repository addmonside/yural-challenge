function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Input({ className, type, ...props }) {
  const invalid = props['aria-invalid'] === true || props['aria-invalid'] === 'true'

  return (
    <input
      type={type}
      data-slot="input"
      className={cn('form-control', invalid && 'is-invalid', className)}
      {...props}
    />
  )
}
