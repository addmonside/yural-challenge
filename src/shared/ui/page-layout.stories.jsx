import { expect, within } from 'storybook/test'
import { Button } from './button'
import { PageLayout } from './page-layout'

export default {
  title: 'ui/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  render: () => (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Поиск автозапчастей</PageLayout.Title>
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <span className="fw-semibold">Найдено: 3</span>
        <Button variant="ghost">Обновить</Button>
      </PageLayout.Toolbar>
      <PageLayout.Content as="main">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h5">Bosch</h2>
                <p className="card-text text-body-secondary">Артикул 0986AB1234</p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { level: 1, name: 'Поиск автозапчастей' }),
    ).toBeVisible()
    await expect(canvas.getByText('Bosch')).toBeVisible()
    await expect(canvas.getByText('Найдено: 3')).toBeVisible()
  },
}

export const WithError = {
  args: {
    error: {
      message: 'Не удалось загрузить данные. Попробуйте позже.',
    },
  },
  render: (args) => (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Поиск автозапчастей</PageLayout.Title>
      </PageLayout.Header>
      <PageLayout.Error error={args.error} />
      <PageLayout.Content as="main">
        <div className="card shadow-sm">
          <div className="card-body text-body-secondary">Результаты появятся здесь.</div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('alert')).toHaveTextContent(
      'Не удалось загрузить данные. Попробуйте позже.',
    )
  },
}
