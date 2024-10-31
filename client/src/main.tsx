import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
        <App />
        </PersistGate>
    </Provider>
  </>,
)