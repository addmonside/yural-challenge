import { expect } from 'storybook/test'
import { Skeleton } from './skeleton'

export default {
  title: 'ui/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span'],
    },
  },
  args: {
    style: { width: '16rem', height: '1rem' },
  },
}

export const Default = {
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]')

    await expect(skeleton).toBeInTheDocument()
    await expect(skeleton).toHaveAttribute('aria-hidden', 'true')
  },
}

export const AsSpan = {
  args: {
    as: 'span',
    style: { display: 'inline-block', width: '8rem', height: '1rem' },
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]')

    await expect(skeleton?.tagName).toBe('SPAN')
  },
}

export const WithCustomClass = {
  args: {
    className: 'rounded-pill',
    style: { width: '12rem', height: '2rem' },
  },
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('[data-slot="skeleton"]')

    await expect(skeleton).toHaveClass('rounded-pill')
  },
}

export const ListRows = {
  render: () => (
    <div className="list-group w-100">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="list-group-item d-flex align-items-center gap-3 py-3"
        >
          <Skeleton
            className="flex-grow-1"
            style={{ height: '1rem' }}
          />
          <Skeleton style={{ width: '2rem', height: '1rem' }} />
          <Skeleton style={{ width: '5rem', height: '1rem' }} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(9)
    await expect(canvasElement.querySelector('.list-group')).toBeInTheDocument()
  },
}
