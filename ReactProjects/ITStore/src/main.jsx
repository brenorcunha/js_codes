import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StockContextProvider from './contexts/StockContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StockContextProvider>
    <App />
  </StockContextProvider>
)
