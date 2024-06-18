import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router'
import.meta.env.DEV

function App() {
  // const [count, setCount] = useState(0)
    return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App

// npm install react-scripts@latest dotenv ('vite-plugin-node-polyfills' Only if necessary!).