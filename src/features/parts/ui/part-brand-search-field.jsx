import { useCallback } from 'react'
import { useQueryParam } from '@/shared/lib'
import { InputGroup } from '@/shared/ui/input-group'
import { usePartBrandSearchField } from '../model/use-part-brand-search-field'

export function PartBrandSearchField() {
  const [search, setSearch] = useQueryParam('search')
  const { isPending, handleSubmit, register, errors } = usePartBrandSearchField({ article: search })
  const handle = useCallback((data) => setSearch(data.article), [setSearch])

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
