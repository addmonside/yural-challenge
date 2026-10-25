import { PageLayout } from '@/shared/ui/page-layout'
import { BrandSearchField } from './ui/brand-search-field'
import { BrandList } from './ui/brand-list'

function PartBrandListPage() {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Поиск автозапчастей</PageLayout.Title>
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <BrandSearchField />
      </PageLayout.Toolbar>
      <BrandList />
    </PageLayout>
  )
}

export const Component = PartBrandListPage
