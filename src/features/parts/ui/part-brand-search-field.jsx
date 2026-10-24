import { useCallback, useEffect } from 'react'
import { useDebouncedValue, useQueryParam } from '@/shared/lib'
import { InputGroup } from '@/shared/ui/input-group'
import { isValidArticle } from '../model/article-schema'
import { usePartBrandSearchField } from '../model/use-part-brand-search-field'

export function PartBrandSearchField() {
  const [search, setSearch] = useQueryParam('search')
  const { isPending, handleSubmit, register, watch, errors } = usePartBrandSearchField({
    article: search,
  })
  const article = (watch('article') ?? '').trim()
  const debouncedArticle = useDebouncedValue(article, 400)
  const handle = useCallback((data) => setSearch(data.article), [setSearch])

  useEffect(() => {
    if (debouncedArticle === (search ?? '')) {
      return
    }

    if (!debouncedArticle) {
      setSearch('', { replace: true })
      return
    }

    if (isValidArticle(debouncedArticle)) {
      setSearch(debouncedArticle, { replace: true })
    }
  }, [debouncedArticle, search, setSearch])

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
          {...register('article')}
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
