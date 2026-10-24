import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import './main.scss'
import { Providers } from './providers'
import { makeRouter } from './router'

const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = () => {
  document.documentElement.dataset.bsTheme = themeMedia.matches ? 'dark' : 'light'
}

applyTheme()
themeMedia.addEventListener('change', applyTheme)

// oxlint-disable-next-line react/only-export-components
const App = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={makeRouter(<App />)} />
    </Providers>
  </StrictMode>,
)
