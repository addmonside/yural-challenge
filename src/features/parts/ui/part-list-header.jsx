import { Text } from '@/shared/ui/text'

export function PartListHeader() {
  return (
    <div
      className="row g-2 px-3 d-none d-md-flex"
      data-slot="part-list-header"
    >
      <Text
        as="span"
        size="xs"
        variant="muted"
        className="col-md-8"
      >
        Производитель / Наименование
      </Text>
      <Text
        as="span"
        size="xs"
        variant="muted"
        className="col-md-1 text-center"
      >
        В наличии
      </Text>
      <Text
        as="span"
        size="xs"
        variant="muted"
        className="col-md-3 text-end"
      >
        Цена
      </Text>
    </div>
  )
}
