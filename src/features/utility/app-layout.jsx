import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <main
      className="d-flex flex-column min-vh-100"
      data-slot="app-layout"
    >
      <Outlet />
    </main>
  )
}

export const Component = AppLayout
