import { useState } from 'react'
import { PageLayout } from '@/shared/ui/page-layout'
import { AppLayout } from '@/shared/ui/app-layout'
import { PartSearchField, PartBrandList, PartList } from '@/features/parts'
import { useCallback } from 'react'

export function App() {
  const [article, setArticle] = useState()
  const [brand, setBrand] = useState(null)
  const clearBrand = useCallback(() => setBrand(null), [setBrand])

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
            onClearBrand={clearBrand}
          />
        )}
      </PageLayout>
    </AppLayout>
  )
}
