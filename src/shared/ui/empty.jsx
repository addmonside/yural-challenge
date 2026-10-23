// oxlint-disable react/only-export-components
import { clsx } from 'clsx'
import styles from './empty.module.scss'

const mediaVariants = {
  default: 'bg-transparent',
  icon: 'rounded-3 bg-body-secondary text-body',
}

function EmptyRoot({ className, ...props }) {
  return (
    <div
      data-slot="empty"
      className={clsx(
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
      className={clsx(
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
      className={clsx(
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
      className={clsx(styles.title, 'fs-5 fw-semibold', className)}
      {...props}
    />
  )
}

function EmptyDescription({ as, className, ...props }) {
  const Comp = as ?? 'p'

  return (
    <Comp
      data-slot="empty-description"
      className={clsx(styles.description, 'text-body-secondary', className)}
      {...props}
    />
  )
}

function EmptyContent({ as, className, ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="empty-content"
      className={clsx(
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
