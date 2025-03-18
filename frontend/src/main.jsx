import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppState from "./context/AppState.jsx"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>,
)
