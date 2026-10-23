import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '@/features/counter'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: { counter: counterReducer },
})

export function StoreProvider({ children }) {
  console.log({ store })
  return <Provider store={store}>{children}</Provider>
}
