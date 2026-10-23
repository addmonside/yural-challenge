// oxlint-disable react/only-export-components
import styles from './alert.module.scss'

const alertVariants = {
  default: 'bg-body text-body',
  destructive: 'bg-body text-danger',
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function AlertRoot({ className, variant = 'default', ...props }) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(
        styles.alert,
        'position-relative border rounded-4 px-3 py-2 text-start small',
        alertVariants[variant] ?? alertVariants.default,
        className,
      )}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }) {
  return <div data-slot="alert-title" className={cn('fw-semibold', className)} {...props} />
}

function AlertDescription({ className, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn(styles.description, 'lh-1', className)}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }) {
  return (
    <div
      data-slot="alert-action"
      className={cn('position-absolute top-0 end-0 p-2', className)}
      {...props}
    />
  )
}

export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
})

export { AlertAction, AlertDescription, AlertTitle }
