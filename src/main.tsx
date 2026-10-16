import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
// @ts-expect-error CSS files are handled by the bundler, not TypeScript.
import './styles.css'
// @ts-expect-error CSS files are handled by the bundler, not TypeScript.
import './catalog.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
