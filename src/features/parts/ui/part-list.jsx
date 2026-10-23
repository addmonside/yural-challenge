import { PageLayout } from '@/shared/ui/page-layout'
import { useParts } from '../model/use-parts'
import { PartListSkeleton } from './part-list-skeleton'
import { PartListItem } from './part-list-item'
import BarcodeIcon from '@/shared/assets/barcode.svg'

export function PartList({ article, brand }) {
  const { list, isPending, error } = useParts(article, brand, true)

  if (isPending) {
    return <PartListSkeleton />
  }

  if (error) {
    return (
      <PageLayout.Error
        title="Не удалось загрузить производителей"
        error={error}
      />
    )
  }

  if (list.length === 0) {
    return (
      <PageLayout.Empty
        icon={<BarcodeIcon />}
        title="Нет подходящих запчастей"
        description={`Для Артикула ${article}  и бренда ${brand} нет подзодящих запчастей`}
      />
    )
  }

  return (
    <PageLayout.Content
      as="ul"
      className="list-group"
    >
      {list.map((part) => (
        <PartListItem
          key={part.brand}
          brand={part.brand}
          name={part.name}
          count={part.count}
          price={part.price}
        />
      ))}
    </PageLayout.Content>
  )
}
