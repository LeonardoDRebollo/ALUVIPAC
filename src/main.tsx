import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { SnackbarProvider } from 'notistack'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
  </StrictMode>,
)
