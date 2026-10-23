import { useState } from 'react'
import { PageLayout } from '@/shared/ui/page-layout'
import { AppLayout } from '@/shared/ui/app-layout'
import { PartSearchField, PartBrandList, PartList } from '@/features/parts'

export function App() {
  const [article, setArticle] = useState()
  const [brand, setBrand] = useState(null)

  return (
    <AppLayout>
      <PageLayout>
        <PageLayout.Header>
          <PageLayout.Title>Поиск автозапчастей</PageLayout.Title>
        </PageLayout.Header>
        <PageLayout.Toolbar>
          <PartSearchField onSearch={setArticle} />
        </PageLayout.Toolbar>
        {!brand && (
          <PartBrandList
            article={article}
            onSelect={setBrand}
          />
        )}
        {brand && (
          <PartList
            article={article}
            brand={brand}
          />
        )}
      </PageLayout>
    </AppLayout>
  )
}
