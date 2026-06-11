import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'

if (!CSS.supports('animation-timeline: scroll()')) {
  await import('scroll-timeline-polyfill/dist/scroll-timeline.js')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
