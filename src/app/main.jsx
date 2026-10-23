import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.scss'
import App from './app'

const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = () => {
  document.documentElement.dataset.bsTheme = themeMedia.matches ? 'dark' : 'light'
}

applyTheme()
themeMedia.addEventListener('change', applyTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
