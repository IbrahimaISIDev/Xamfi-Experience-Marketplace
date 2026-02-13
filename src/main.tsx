import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { seedData } from './lib/blink'

seedData().catch(console.error)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
