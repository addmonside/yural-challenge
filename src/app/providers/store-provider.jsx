import { configureStore } from '@reduxjs/toolkit'
import { partsReducer } from '@/features/parts'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: { parts: partsReducer },
})

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}
