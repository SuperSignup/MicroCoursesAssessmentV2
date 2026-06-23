/*
Overview:
This page contains the root node and strict mode for the react app, also contains the app
*/

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
