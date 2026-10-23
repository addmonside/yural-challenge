import { Price } from '@/shared/ui/price'

export function PartListItem({ brand, name, count, price }) {
  return (
    <li className="d-flex list-group-item list-group-item-action align-items-center">
      <p className="text-start col">
        {brand} {name}
      </p>
      <p className="text-center col-1">{count}</p>
      <Price
        value={price}
        className="text-end col-2"
      />
    </li>
  )
}
