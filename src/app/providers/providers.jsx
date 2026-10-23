import { StoreProvider } from './store-provider'

export function Providers({ children }) {
  return <StoreProvider>{children}</StoreProvider>
}
