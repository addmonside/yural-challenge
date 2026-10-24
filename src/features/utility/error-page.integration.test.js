import { createElement } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vite-plus/test'
import { Component as ErrorPage } from './error-page'

function renderPage(path = '/:codeId', entry = '/404') {
  return render(
    createElement(
      MemoryRouter,
      { initialEntries: [entry] },
      createElement(
        Routes,
        null,
        createElement(Route, { path, element: createElement(ErrorPage) }),
      ),
    ),
  )
}

describe('ErrorPage', () => {
  it('renders the not found message for the 404 code', () => {
    renderPage()

    expect(screen.getByText('Страница не найдена')).toBeVisible()
    expect(
      screen.getByText('Запрошенная страница не существует или была перемещена.'),
    ).toBeVisible()
  })

  it('falls back to the 404 message without a code param', () => {
    renderPage('/', '/')

    expect(screen.getByText('Страница не найдена')).toBeVisible()
  })

  it('renders the unknown error message for any other code', () => {
    renderPage('/:codeId', '/500')

    expect(screen.getByText('Что-то пошло не так')).toBeVisible()
    expect(screen.getByText('Обратитесь к администратору')).toBeVisible()
  })
})
