import { expect, fn, userEvent, within } from 'storybook/test'
import { Alert } from './alert'
import { Button } from './button'

export default {
  title: 'ui/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
  args: {
    variant: 'default',
  },
}

export const Default = {
  render: (args) => (
    <Alert variant={args.variant}>
      <Alert.Title>Внимание</Alert.Title>
      <Alert.Description>Проверьте артикул и бренд перед поиском.</Alert.Description>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('alert')).toHaveTextContent('Проверьте артикул и бренд')
  },
}

export const Destructive = {
  args: {
    variant: 'destructive',
  },
  render: Default.render,
  play: async ({ canvasElement }) => {
    const alert = within(canvasElement).getByRole('alert')

    await expect(alert).toHaveAttribute('data-variant', 'destructive')
    await expect(alert).toHaveTextContent('Внимание')
  },
}

export const WithAction = {
  args: {
    onClose: fn(),
  },
  render: (args) => (
    <Alert>
      <Alert.Title>Нет соединения</Alert.Title>
      <Alert.Description>Не удалось загрузить данные. Попробуйте ещё раз.</Alert.Description>
      <Alert.Action>
        <Button
          variant="ghost"
          onClick={args.onClose}
        >
          Закрыть
        </Button>
      </Alert.Action>
    </Alert>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Закрыть' }))

    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const WithIcon = {
  render: () => (
    <Alert>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M12 8v5M12 16h.01" />
      </svg>
      <Alert.Title>Товар не найден</Alert.Title>
      <Alert.Description>Проверьте номер артикула и попробуйте снова.</Alert.Description>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const alert = within(canvasElement).getByRole('alert')

    await expect(alert.querySelector('svg')).toBeInTheDocument()
    await expect(alert).toHaveTextContent('Товар не найден')
  },
}
