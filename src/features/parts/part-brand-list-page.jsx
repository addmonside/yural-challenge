import { PageLayout } from '@/shared/ui/page-layout'
import { PartBrandSearchField } from './ui/part-brand-search-field'
import { PartBrandList } from './ui/part-brand-list'

function PartBrandListPage() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Поиск автозапчастей</PageLayout.Title>
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <PartBrandSearchField />
      </PageLayout.Toolbar>
      <PartBrandList />
    </PageLayout>
  )
}

export const Component = PartBrandListPage
