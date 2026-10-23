import { expect } from 'storybook/test'
import { Price } from './price'

export default {
  title: 'ui/Price',
  component: Price,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
  },
}

const NBSP = ' '

export const Default = {
  args: {
    value: 1200,
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toBe(`1${NBSP}200${NBSP}₽`)
  },
}

export const WithDecimals = {
  args: {
    value: 1200.5,
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toBe(`1${NBSP}200,5${NBSP}₽`)
  },
}

export const RoundsToTwoDecimals = {
  args: {
    value: 1200.555,
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toBe(`1${NBSP}200,56${NBSP}₽`)
  },
}

export const LargeNumber = {
  args: {
    value: 1234567,
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toBe(`1${NBSP}234${NBSP}567${NBSP}₽`)
  },
}

export const Zero = {
  args: {
    value: 0,
  },
  play: async ({ canvasElement }) => {
    expect(canvasElement.textContent).toBe(`0${NBSP}₽`)
  },
}
