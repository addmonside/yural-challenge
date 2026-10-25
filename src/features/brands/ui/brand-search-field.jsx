import { useCallback } from 'react'
import { useDebouncedCallback, useQueryParam } from '@/shared/lib'
import { InputGroup } from '@/shared/ui/input-group'
import { isValidArticle } from '../model/article-schema'
import { useBrandSearchField } from '../model/use-brand-search-field'

export function BrandSearchField() {
  const [search, setSearch] = useQueryParam('search')
  const { isPending, handleSubmit, register, errors } = useBrandSearchField({
    article: search,
  })

  const syncSearch = useDebouncedCallback((raw) => {
    const value = raw.trim()

    if (!value) {
      setSearch('', { replace: true })
    } else if (isValidArticle(value)) {
      setSearch(value, { replace: true })
    }
  }, 400)

  const handle = useCallback(
    (data) => {
      syncSearch.cancel()
      setSearch(data.article)
    },
    [setSearch, syncSearch],
  )

  const { onChange, ...articleField } = register('article')

  return (
    <form
      onSubmit={handleSubmit(handle)}
      noValidate
      className="w-100"
    >
      <InputGroup>
        <InputGroup.Addon>
          <InputGroup.Text>Артикул</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input
          aria-label="Артикул"
          placeholder="Например, 1234567890"
          {...articleField}
          onChange={(e) => {
            onChange(e)
            syncSearch(e.target.value)
          }}
        />
        <InputGroup.Button
          type="submit"
          variant="primary"
          isPending={isPending}
        >
          Найти
        </InputGroup.Button>

        {errors.article && (
          <p
            role="alert"
            style={{ color: 'red' }}
          >
            {errors.article.message}
          </p>
        )}
      </InputGroup>
    </form>
  )
}
