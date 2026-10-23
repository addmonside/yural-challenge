import { expect, fn, userEvent, within } from 'storybook/test'

import { InputGroup } from './input-group'

export default {
  title: 'Shared/UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <InputGroup>
      <InputGroup.Addon>
        <InputGroup.Text>Артикул</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input
        aria-label="Артикул"
        placeholder="Например, 1234567890"
      />
      <InputGroup.Button onClick={args.onClick}>Найти</InputGroup.Button>
    </InputGroup>
  ),
}

export const Search = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Артикул' })

    await userEvent.type(input, 'ABC-123')
    await userEvent.click(canvas.getByRole('button', { name: 'Найти' }))

    await expect(input).toHaveValue('ABC-123')
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const TextAddon = {
  render: () => (
    <InputGroup>
      <InputGroup.Addon>
        <InputGroup.Text>руб.</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input
        aria-label="Цена"
        placeholder="0.00"
        inputMode="decimal"
      />
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Цена' })

    await userEvent.type(input, '1500')

    await expect(input).toHaveValue('1500')
  },
}

export const InlineEndButton = {
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <InputGroup>
      <InputGroup.Input
        aria-label="Поиск"
        defaultValue="ABC-123"
      />
      <InputGroup.Button onClick={args.onClick}>Очистить</InputGroup.Button>
    </InputGroup>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Очистить' }))

    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Textarea = {
  render: () => (
    <InputGroup>
      <InputGroup.Textarea
        aria-label="Комментарий"
        rows={3}
        placeholder="Комментарий к заказу"
      />
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const textarea = within(canvasElement).getByRole('textbox', { name: 'Комментарий' })

    await userEvent.type(textarea, 'Нужна доставка')

    await expect(textarea).toHaveValue('Нужна доставка')
  },
}

export const BlockStartAddon = {
  render: () => (
    <InputGroup>
      <InputGroup.Addon align="block-start">
        <InputGroup.Text>Комментарий</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Textarea
        aria-label="Комментарий"
        rows={3}
      />
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const addon = canvasElement.querySelector('[data-slot="input-group-addon"]')

    await expect(addon).toHaveAttribute('data-align', 'block-start')
  },
}
