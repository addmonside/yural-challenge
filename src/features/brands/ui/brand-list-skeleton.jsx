import { PageLayout } from '@/shared/ui/page-layout'
import { Skeleton } from '@/shared/ui/skeleton'

const rows = Array.from({ length: 10 }, (_, index) => `skeleton-${index}`)

export function BrandListSkeleton() {
  return (
    <PageLayout.Content
      as="output"
      aria-live="polite"
      aria-busy="true"
      className="list-group"
    >
      {rows.map((row) => (
        <span
          key={row}
          className="list-group-item d-flex align-items-center gap-3"
        >
          <Skeleton
            as="span"
            className="flex-grow-1"
            style={{ height: '1.5rem' }}
          />
        </span>
      ))}
    </PageLayout.Content>
  )
}
