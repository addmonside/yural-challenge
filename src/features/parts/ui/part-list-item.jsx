import { Price } from '@/shared/ui/price'
import { Text } from '@/shared/ui/text'
import { useIsMobile } from '@/shared/lib'

export function PartListItem({ brand, name, count, price }) {
  const isMobile = useIsMobile(768)
  return (
    <li className="list-group-item list-group-item-action">
      <div className="row g-2 align-items-center">
        <div className="col-12 col-md-8 d-flex flex-column">
          <Text
            as="span"
            size="xxs"
            variant="mutted"
          >
            {brand}
          </Text>
          <Text
            as="span"
            className="text-truncate-2 d-inline-block"
          >
            {name}
          </Text>
        </div>
        <p className="col-6 col-md-1 mb-0 text-start text-md-center">
          {isMobile && (
            <Text
              as="span"
              size="xs"
              variant="mutted"
              className="pe-1 d-inline-block"
            >
              В наличии:
            </Text>
          )}
          <span>{count}</span>
        </p>
        <div className="col-6 col-md-3">
          <Price
            value={price}
            className="text-end mb-0"
          />
        </div>
      </div>
    </li>
  )
}
