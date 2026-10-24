import LoaderCicleIcon from '@/shared/assets/loader-circle.svg'
import { useMemo } from 'react'
import { clsx } from 'clsx'
import styles from './button.module.scss'

export function Button({
  type = 'button',
  className,
  variant = 'primary',
  isPending,
  children,
  ...props
}) {
  const cachedVariant = useMemo(
    () => (variants.has(variant) ? variants.get(variant) : variants.get('primary')),
    [variant],
  )
  return (
    <button
      data-slot="button"
      data-variant={variant}
      type={type}
      className={clsx('btn', isPending && 'pointer-events-none', cachedVariant, className)}
      {...props}
    >
      {isPending ? <LoaderCicleIcon className={styles.spin} /> : children}
    </button>
  )
}

const variants = new Map([
  ['primary', 'btn-primary'],
  ['ghost', styles.ghost],
  ['outline', 'btn-outline-primary'],
])
