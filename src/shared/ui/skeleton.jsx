import { clsx } from 'clsx'
import styles from './skeleton.module.scss'

export function Skeleton({ as, className, ...props }) {
  const Comp = as ?? 'div'

  return (
    <Comp
      data-slot="skeleton"
      aria-hidden="true"
      className={clsx(styles.root, className)}
      {...props}
    />
  )
}
