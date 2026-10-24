import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { articleFormSchema } from './article-schema'
import { usePartBrandSearchField } from './use-part-brand-search-field'

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
}))

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(() => 'mock-resolver'),
}))

const register = vi.fn()
const handleSubmit = vi.fn()
const watch = vi.fn()

function mockForm({ errors = {}, isSubmitting = false } = {}) {
  useForm.mockReturnValue({
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  })
}

describe('usePartBrandSearchField', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockForm()
  })

  it('configures the form with the article schema and default value', () => {
    usePartBrandSearchField({ article: '7160500039' })

    expect(zodResolver).toHaveBeenCalledWith(articleFormSchema)
    expect(useForm).toHaveBeenCalledWith({
      resolver: 'mock-resolver',
      defaultValues: { article: '7160500039' },
      mode: 'onChange',
    })
  })

  it('exposes the form API returned by useForm', () => {
    const result = usePartBrandSearchField({ article: '7160500039' })

    expect(result.register).toBe(register)
    expect(result.handleSubmit).toBe(handleSubmit)
    expect(result.watch).toBe(watch)
    expect(result.errors).toEqual({})
  })

  it('exposes validation errors', () => {
    const errors = { article: { message: 'Только цифры' } }
    mockForm({ errors })

    const result = usePartBrandSearchField({ article: 'abc' })

    expect(result.errors).toEqual(errors)
  })

  it('maps isSubmitting to isPending', () => {
    expect(usePartBrandSearchField({ article: '12' }).isPending).toBe(false)

    mockForm({ isSubmitting: true })

    expect(usePartBrandSearchField({ article: '12' }).isPending).toBe(true)
  })
})
