import { expect, within } from 'storybook/test'
import { PartListItem } from './part-list-item'

const NBSP = '\u00a0'

export default {
  title: 'parts/PartListItem',
  component: PartListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ul className="list-group">
        <Story />
      </ul>
    ),
  ],
  argTypes: {
    count: { control: 'number' },
    price: { control: 'number' },
  },
  args: {
    brand: 'OSSCA',
    name: 'Колодка тормозная',
    count: 12,
    price: 1200,
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('OSSCA Колодка тормозная')).toBeVisible()
    await expect(canvas.getByText('12')).toBeVisible()
    await expect(canvasElement.textContent).toContain(`1${NBSP}200${NBSP}₽`)
  },
}

export const LongName = {
  args: {
    brand: 'BOSCH',
    name: 'Колодка тормозная передняя с датчиком износа',
    count: 3,
    price: 8450.5,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.textContent).toContain(`8${NBSP}450,5${NBSP}₽`)
  },
}

export const ZeroCount = {
  args: {
    count: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('0')).toBeVisible()
  },
}
