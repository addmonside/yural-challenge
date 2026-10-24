import { expect, within } from 'storybook/test'
import { Text } from './text'

export default {
  title: 'ui/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'success', 'danger', 'warning'],
    },
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  args: {
    children: 'Текст по умолчанию',
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    const text = within(canvasElement).getByText('Текст по умолчанию')

    await expect(text.tagName).toBe('P')
    await expect(text).toHaveClass('text-body', 'fs-6')
  },
}

export const Muted = {
  args: {
    variant: 'muted',
    children: 'Второстепенный текст',
  },
  play: async ({ canvasElement }) => {
    const text = within(canvasElement).getByText('Второстепенный текст')

    await expect(text).toHaveClass('text-body-secondary')
  },
}

export const Large = {
  args: {
    size: 'lg',
    children: 'Крупный текст',
  },
  play: async ({ canvasElement }) => {
    const text = within(canvasElement).getByText('Крупный текст')

    await expect(text).toHaveClass('fs-5')
  },
}

export const CustomElement = {
  args: {
    as: 'span',
    children: 'Текст в span',
  },
  play: async ({ canvasElement }) => {
    const text = within(canvasElement).getByText('Текст в span')

    await expect(text.tagName).toBe('SPAN')
  },
}

export const AllVariants = {
  render: () => (
    <div className="d-flex flex-column gap-2">
      <Text variant="default">default</Text>
      <Text variant="muted">muted</Text>
      <Text variant="primary">primary</Text>
      <Text variant="success">success</Text>
      <Text variant="danger">danger</Text>
      <Text variant="warning">warning</Text>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('muted')).toHaveClass('text-body-secondary')
    await expect(canvas.getByText('danger')).toHaveClass('text-danger')
    await expect(canvas.getByText('warning')).toHaveClass('text-warning')
  },
}
