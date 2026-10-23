import { PageLayout } from '@/shared/ui/page-layout'
import { useParts } from '../model/use-parts'
import { PartListSkeleton } from './part-list-skeleton'
import BarcodeIcon from '@/shared/assets/barcode.svg'
import SearchIcon from '@/shared/assets/search.svg'

export function PartBrandList({ article, onSelect }) {
  const { brandNameList, isPending, error } = useParts(article)
  const hasArticle = Boolean(article?.trim())

  if (!hasArticle) {
    return (
      <PageLayout.Empty
        icon={<BarcodeIcon />}
        title="Не введен артикул"
        description="Введите артикул автозапчасти, чтобы увидеть список доступных производителей"
      />
    )
  }

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

  if (brandNameList.length === 0) {
    return (
      <PageLayout.Empty
        icon={<SearchIcon />}
        title="Нет подходящих запчастей"
        description={`Для Артикула ${article} нет подходящих запчастей`}
      />
    )
  }

  return (
    <PageLayout.Content
      as="div"
      className="list-group"
    >
      {brandNameList.map((brand) => (
        <button
          key={brand}
          className="list-group-item list-group-item-action text-start"
          type="button"
          aria-label={`Выбрать производителя ${brand}`}
          onClick={() => onSelect(brand)}
        >
          {brand}
        </button>
      ))}
    </PageLayout.Content>
  )
}
