import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// @ts-expect-error CSS files are handled by the bundler, not TypeScript.
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
