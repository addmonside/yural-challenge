import { useParams } from 'react-router'
import BugIcon from '@/shared/assets/bug.svg'
import { PageLayout } from '@/shared/ui/page-layout'

const ERROR_DATA = {
  404: {
    title: 'Страница не найдена',
    description: 'Запрошенная страница не существует или была перемещена.',
  },
  unknown: {
    title: 'Что-то пошло не так',
    description: 'Обратитесь к администратору',
  },
}

function ErrorPage() {
  const { codeId = '404' } = useParams()
  const data = ERROR_DATA[codeId] ?? ERROR_DATA.unknown

  return (
    <PageLayout variant="centered">
      <PageLayout.Content variant="centered">
        <PageLayout.Empty
          icon={<BugIcon />}
          title={data.title}
          description={data.description}
        />
      </PageLayout.Content>
    </PageLayout>
  )
}

export const Component = ErrorPage
