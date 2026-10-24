import { PageLayout } from '@/shared/ui/page-layout'
import { Skeleton } from '@/shared/ui/skeleton'

const rows = Array.from({ length: 10 }, (_, index) => `skeleton-${index}`)

export function PartListSkeleton() {
  return (
    <PageLayout.Content
      as="output"
      aria-live="polite"
      aria-busy="true"
      className="list-group"
    >
      {rows.map((row) => (
        <div
          key={row}
          className="list-group-item"
        >
          <div className="row align-items-center">
            <div className="col-12 col-md-8 d-flex flex-column gap-1 pt-1">
              <Skeleton
                as="span"
                style={{
                  width: '25%',
                  height: '0.9375rem',
                  'min-height': '0.9375rem',
                }}
              />
              <Skeleton
                as="span"
                style={{ width: '70%', height: '1rem' }}
              />
            </div>
            <div className="col-6 col-md-1 d-flex justify-content-start justify-content-md-center">
              <Skeleton
                as="span"
                style={{ width: '2rem', height: '1rem' }}
              />
            </div>
            <div className="col-6 col-md-3 d-flex justify-content-end">
              <Skeleton
                as="span"
                style={{ width: '5rem', height: '1rem' }}
              />
            </div>
          </div>
        </div>
      ))}
    </PageLayout.Content>
  )
}
