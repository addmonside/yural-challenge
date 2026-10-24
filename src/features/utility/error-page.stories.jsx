import { expect, within } from 'storybook/test'
import { MemoryRouter, Route, Routes } from 'react-router'
import { Component as ErrorPage } from './error-page'

export default {
  title: 'utility/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    codeId: { control: 'text' },
  },
  args: {
    codeId: '404',
  },
}

function renderPage(codeId) {
  return (
    <MemoryRouter initialEntries={[`/${codeId}`]}>
      <Routes>
        <Route
          path="/:codeId"
          element={<ErrorPage />}
        />
      </Routes>
    </MemoryRouter>
  )
}

export const NotFound = {
  render: (args) => renderPage(args.codeId),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Страница не найдена')).toBeVisible()
    await expect(
      canvas.getByText('Запрошенная страница не существует или была перемещена.'),
    ).toBeVisible()
  },
}

export const Unknown = {
  args: {
    codeId: '500',
  },
  render: (args) => renderPage(args.codeId),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('Что-то пошло не так')).toBeVisible()
    await expect(canvas.getByText('Обратитесь к администратору')).toBeVisible()
  },
}
