export function PartListSkeleton() {
  return (
    <output className="d-flex justify-content-center p-4">
      <span
        className="spinner-border text-primary"
        aria-hidden="true"
      />
      <span className="visually-hidden">Загрузка производителей</span>
    </output>
  )
}
