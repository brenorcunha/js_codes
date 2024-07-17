import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App

// npm install react-scripts@latest dotenv ('--save-dev vite-plugin-node-polyfills' Only if necessary!).