import { createElement } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it, vi } from 'vite-plus/test'
import { PartBrandSearchField } from './part-brand-search-field'

vi.mock('@/shared/lib', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useDebouncedValue: (value) => value,
  }
})

function LocationDisplay() {
  const location = useLocation()

  return createElement('output', { 'data-testid': 'location' }, location.search)
}

function renderField(initialEntries = ['/']) {
  return render(
    createElement(
      MemoryRouter,
      { initialEntries },
      createElement(LocationDisplay),
      createElement(PartBrandSearchField),
    ),
  )
}

function getLocation() {
  return screen.getByTestId('location').textContent
}

describe('PartBrandSearchField', () => {
  it('renders the article input and the submit button', () => {
    renderField()

    expect(screen.getByRole('textbox', { name: 'Артикул' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Найти' })).toBeVisible()
  })

  it('writes a valid article with letters into the query param', async () => {
    const user = userEvent.setup()
    renderField()

    await user.type(screen.getByRole('textbox', { name: 'Артикул' }), '7160500039S')

    await waitFor(() => expect(getLocation()).toBe('?search=7160500039S'))
  })

  it('writes a valid article with a slash into the query param', async () => {
    const user = userEvent.setup()
    renderField()

    await user.type(screen.getByRole('textbox', { name: 'Артикул' }), '7160500039/S')

    await waitFor(() => expect(getLocation()).toBe('?search=7160500039%2FS'))
  })

  it('does not write an invalid article into the query param', async () => {
    const user = userEvent.setup()
    renderField()

    await user.type(screen.getByRole('textbox', { name: 'Артикул' }), '12 34')

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Только буквы, цифры и допустимые символы',
    )
    expect(getLocation()).toBe('')
  })

  it('removes the query param when the input is cleared', async () => {
    const user = userEvent.setup()
    renderField(['/?search=123456'])

    const input = screen.getByRole('textbox', { name: 'Артикул' })
    expect(input).toHaveValue('123456')

    await user.clear(input)

    await waitFor(() => expect(getLocation()).toBe(''))
  })

  it('shows a validation error on submit and keeps the query param empty', async () => {
    const user = userEvent.setup()
    renderField()

    await user.type(screen.getByRole('textbox', { name: 'Артикул' }), '1')
    await user.click(screen.getByRole('button', { name: 'Найти' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Не меньше 2 символов')
    expect(getLocation()).toBe('')
  })
})
