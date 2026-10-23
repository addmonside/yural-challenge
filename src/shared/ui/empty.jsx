// oxlint-disable react/only-export-components
import styles from './empty.module.scss'

const mediaVariants = {
  default: 'bg-transparent',
  icon: 'rounded-3 bg-body-secondary text-body',
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EmptyRoot({ className, ...props }) {
  return (
    <div
      data-slot="empty"
      className={cn(
        styles.root,
        'd-flex flex-column flex-grow-1 align-items-center justify-content-center gap-4 rounded-3 p-4 p-md-5 text-center',
        className,
      )}
      {...props}
    />
  )
}

function EmptyHeader({ as, className, ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="empty-header"
      className={cn(
        styles.header,
        'd-flex flex-column align-items-center gap-2 text-center',
        className,
      )}
      {...props}
    />
  )
}

function EmptyMedia({ as, className, variant = 'default', ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(
        styles.media,
        'd-flex flex-shrink-0 align-items-center justify-content-center',
        mediaVariants[variant] ?? mediaVariants.default,
        className,
      )}
      {...props}
    />
  )
}

function EmptyTitle({ as, className, ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="empty-title"
      className={cn(styles.title, 'fs-5 fw-semibold', className)}
      {...props}
    />
  )
}

function EmptyDescription({ as, className, ...props }) {
  const Comp = as ?? 'p'

  return (
    <Comp
      data-slot="empty-description"
      className={cn(styles.description, 'text-body-secondary', className)}
      {...props}
    />
  )
}

function EmptyContent({ as, className, ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="empty-content"
      className={cn(
        styles.content,
        'd-flex w-100 flex-column align-items-center gap-3 text-center',
        className,
      )}
      {...props}
    />
  )
}

export const Empty = Object.assign(EmptyRoot, {
  Content: EmptyContent,
  Description: EmptyDescription,
  Header: EmptyHeader,
  Media: EmptyMedia,
  Title: EmptyTitle,
})

export { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
