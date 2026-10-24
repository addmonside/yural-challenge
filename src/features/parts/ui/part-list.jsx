import { PageLayout } from '@/shared/ui/page-layout'
import { useParts } from '../model/use-parts'
import { PartBrandListSkeleton } from './part-brand-list-skeleton'
import { PartListItem } from './part-list-item'
import BarcodeIcon from '@/shared/assets/barcode.svg'
import ArrowLeftIcon from '@/shared/assets/arrow-left.svg'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

export function PartList({ article, brand, onClearBrand }) {
  const { list, isPending, error } = useParts(article, brand, true)

  return (
    <PageLayout.Content
      as="section"
      variant="flex"
    >
      <header className="d-flex align-items-center">
        <Button
          onClick={onClearBrand}
          variant="ghost"
        >
          <ArrowLeftIcon />
        </Button>
        <Text
          as="h2"
          size="lg"
        >
          {brand}
        </Text>
      </header>
      {isPending ? (
        <PartBrandListSkeleton />
      ) : error ? (
        <PageLayout.Error
          title="Не удалось загрузить производителей"
          error={error}
        />
      ) : list.length === 0 ? (
        <PageLayout.Empty
          icon={<BarcodeIcon />}
          title="Нет подходящих запчастей"
          description={`Для Артикула ${article}  и бренда ${brand} нет подзодящих запчастей`}
        />
      ) : (
        <ol className="list-group">
          {list.map((part) => (
            <PartListItem
              key={part.brand}
              brand={part.brand}
              name={part.name}
              count={part.count}
              price={part.price}
            />
          ))}
        </ol>
      )}
    </PageLayout.Content>
  )
}
