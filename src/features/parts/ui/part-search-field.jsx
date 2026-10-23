import { InputGroup } from '@/shared/ui/input-group'
import { usePartSearchField } from './use-part-search-field'
import { useCallback } from 'react'

export function PartSearchField({ onSearch }) {
  const { isPending, handleSubmit, register, errors } = usePartSearchField()
  const handle = useCallback((data) => onSearch(data.article), [onSearch])

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
