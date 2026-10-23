import { expect, fn, userEvent, within } from 'storybook/test'
import { Button } from './button'

export default {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Найти',
    variant: 'primary',
  },
}

export const Primary = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }))

    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Ghost = {
  args: {
    variant: 'ghost',
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Найти' })

    await expect(button).toHaveClass('btn-outline-primary')
  },
}

export const Disabled = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Найти' })

    await expect(button).toBeDisabled()

    await userEvent.click(button)

    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
