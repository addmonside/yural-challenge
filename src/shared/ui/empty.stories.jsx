import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from './button'
import { Empty } from './empty'

export default {
  title: 'Shared/UI/Empty',
  component: Empty,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export const Default = {
  render: () => (
    <Empty className="border w-100">
      <Empty.Header>
        <Empty.Title>Ничего не найдено</Empty.Title>
        <Empty.Description>Попробуйте изменить артикул или бренд.</Empty.Description>
      </Empty.Header>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Ничего не найдено')).toBeVisible()
    await expect(canvas.getByText('Попробуйте изменить артикул или бренд.')).toBeVisible()
  },
}

export const IconMedia = {
  render: () => (
    <Empty className="border w-100">
      <Empty.Header>
        <Empty.Media variant="icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
            />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </Empty.Media>
        <Empty.Title>Начните поиск</Empty.Title>
        <Empty.Description>Введите номер артикула, чтобы найти производителей.</Empty.Description>
      </Empty.Header>
    </Empty>
  ),
  play: async ({ canvasElement }) => {
    const media = canvasElement.querySelector('[data-slot="empty-icon"]')

    await expect(media).toHaveAttribute('data-variant', 'icon')
    await expect(media?.querySelector('svg')).toBeInTheDocument()
  },
}

export const WithContentAction = {
  args: {
    onRetry: fn(),
  },
  render: (args) => (
    <Empty className="border w-100">
      <Empty.Header>
        <Empty.Title>Не удалось загрузить данные</Empty.Title>
        <Empty.Description>Проверьте соединение и повторите попытку.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Button onClick={args.onRetry}>Повторить</Button>
      </Empty.Content>
    </Empty>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Повторить' }))

    await expect(args.onRetry).toHaveBeenCalledTimes(1)
    await expect(canvas.getByText('Не удалось загрузить данные')).toBeVisible()
  },
}
