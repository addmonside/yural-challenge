import { useParams, useNavigate } from 'react-router'
import { PageLayout } from '@/shared/ui/page-layout'
import { Button } from '@/shared/ui/button'
import ArrowLeftIcon from '@/shared/assets/arrow-left.svg'
import { PartList } from './ui/part-list'

function PartListPage() {
  const { article, brand } = useParams()
  const navigate = useNavigate()
  return (
    <PageLayout>
      <PageLayout.Header>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon
            width="1.5rem"
            height="2.25rem"
          />
        </Button>
        <PageLayout.Title>{brand}</PageLayout.Title>
      </PageLayout.Header>
      <PartList
        article={article}
        brand={brand}
      />
    </PageLayout>
  )
}

export const Component = PartListPage
