import reactLogo from '@/shared/assets/react.svg'
import viteLogo from '@/shared/assets/vite.svg'
import { Button } from '@/shared/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '@/features/counter'
import { PageLayout } from '../shared/ui/page-layout'

const docsLinks = [
  {
    href: 'https://vite.dev/',
    label: 'Explore Vite',
    icon: <img src={viteLogo} width="18" height="18" alt="" />,
  },
  {
    href: 'https://react.dev/',
    label: 'Learn more',
    icon: <img src={reactLogo} width="18" height="18" alt="" />,
  },
]

const socialLinks = [
  { href: 'https://github.com/vitejs/vite', label: 'GitHub', icon: 'github-icon' },
  { href: 'https://chat.vite.dev/', label: 'Discord', icon: 'discord-icon' },
  { href: 'https://x.com/vite_js', label: 'X.com', icon: 'x-icon' },
  { href: 'https://bsky.app/profile/vite.dev', label: 'Bluesky', icon: 'bluesky-icon' },
]

export function App() {
  const value = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageLayout.Title>Get started</PageLayout.Title>
        <PageLayout.Description>
          Edit <code>src/app/app.jsx</code> and save to test <code>HMR</code>
        </PageLayout.Description>
      </PageLayout.Header>
      <PageLayout.Toolbar>
        <Button onClick={() => dispatch(increment())}>
          Count is <span className="badge rounded-pill text-bg-light ms-2">{value}</span>
        </Button>
      </PageLayout.Toolbar>
      <PageLayout.Content as="main">
        <section className="row g-4">
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title d-flex align-items-center gap-2 h5">
                  <svg width="22" height="22" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#documentation-icon" />
                  </svg>
                  Documentation
                </h2>
                <p className="card-text text-body-secondary">Your questions, answered</p>
              </div>
              <div className="list-group list-group-flush">
                {docsLinks.map((link) => (
                  <a
                    key={link.href}
                    className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title d-flex align-items-center gap-2 h5">
                  <svg width="22" height="22" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#social-icon" />
                  </svg>
                  Connect with us
                </h2>
                <p className="card-text text-body-secondary">Join the Vite community</p>
              </div>
              <div className="list-group list-group-flush">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg width="18" height="18" role="presentation" aria-hidden="true">
                      <use href={`/icons.svg#${link.icon}`} />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </PageLayout.Content>
    </PageLayout>
  )
}
