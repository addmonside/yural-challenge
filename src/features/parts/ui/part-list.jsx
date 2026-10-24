import { PageLayout } from '@/shared/ui/page-layout'
import { useParts } from '../model/use-parts'
import { PartListSkeleton } from './part-list-skeleton'
import { PartListHeader } from './part-list-header'
import { PartListItem } from './part-list-item'
import BarcodeIcon from '@/shared/assets/barcode.svg'

export function PartList({ article, brand }) {
  const { list, isPending, error } = useParts(article, brand, true)
  const sortedList = [...list].sort((a, b) => Number(b.count > 0) - Number(a.count > 0))

  return (
    <PageLayout.Content
      as="section"
      variant="flex"
    >
      {!isPending && error ? (
        <PageLayout.Error
          title="Не удалось загрузить аналоги"
          error={error}
        />
      ) : !isPending && list.length === 0 ? (
        <PageLayout.Empty
          icon={<BarcodeIcon />}
          title="Нет подходящих запчастей"
          description={`Для артикула ${article} и бренда ${brand} нет подходящих запчастей`}
        />
      ) : (
        <>
          <PartListHeader />
          {isPending ? (
            <PartListSkeleton />
          ) : (
            <ol className="list-group">
              {sortedList.map((part, index) => (
                <PartListItem
                  key={part.goodsID || `${part.brand}-${index}`}
                  brand={part.brand}
                  name={part.name}
                  count={part.count}
                  price={part.price}
                />
              ))}
            </ol>
          )}
        </>
      )}
    </PageLayout.Content>
  )
}
