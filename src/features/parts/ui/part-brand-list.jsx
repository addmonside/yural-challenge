import { href, Link } from 'react-router'
import SearchIcon from '@/shared/assets/search.svg'
import BarcodeIcon from '@/shared/assets/barcode.svg'
import { useQueryParam } from '@/shared/lib'
import { routes } from '@/shared/model'
import { PageLayout } from '@/shared/ui/page-layout'
import { useParts } from '../model/use-parts'
import { PartBrandListSkeleton } from './part-brand-list-skeleton'

export function PartBrandList() {
  const [article] = useQueryParam('search')
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
    return <PartBrandListSkeleton />
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
        <Link
          key={brand}
          className="list-group-item list-group-item-action text-start"
          to={href(routes.PART_LIST_BY_BRAND, {
            brand,
            article,
          })}
          aria-label={`Выбрать производителя ${brand}`}
        >
          {brand}
        </Link>
      ))}
    </PageLayout.Content>
  )
}
