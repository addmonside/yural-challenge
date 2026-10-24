const variants = {
  default: 'text-body',
  muted: 'text-body-secondary',
  primary: 'text-primary',
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning',
}

const sizes = {
  xxs: 'fs-xxs',
  xs: 'fs-xs',
  sm: 'small',
  md: 'fs-6',
  lg: 'fs-5',
  xl: 'fs-4',
  xxl: 'fs-3',
}

export function Text({ as, className, children, variant = 'default', size = 'md' }) {
  const Comp = as ?? 'p'

  const classes = [variants[variant], sizes[size], className].filter(Boolean).join(' ')

  return <Comp className={classes}>{children}</Comp>
}
