import { expect, userEvent, within } from 'storybook/test'

import { Input } from './input'

export default {
  title: 'Shared/UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    'aria-label': 'Артикул',
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Артикул' })

    await userEvent.type(input, 'ABC-123')

    await expect(input).toHaveValue('ABC-123')
  },
}

export const WithPlaceholder = {
  args: {
    placeholder: 'Например, 1234567890',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByPlaceholderText('Например, 1234567890')

    await expect(input).toBeVisible()
  },
}

export const Invalid = {
  args: {
    'aria-invalid': true,
    defaultValue: '?',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Артикул' })

    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(input).toHaveClass('is-invalid')
  },
}

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: 'ABC-123',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Артикул' })

    await expect(input).toBeDisabled()
  },
}

export const Email = {
  args: {
    'aria-label': 'Email',
    type: 'email',
    placeholder: 'name@example.com',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Email' })

    await userEvent.type(input, 'name@example.com')

    await expect(input).toHaveValue('name@example.com')
  },
}
