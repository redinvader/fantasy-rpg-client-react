import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { PublicRoutes } from './router'


function App() {
  const [count, setCount] = useState(0)

  return (
    <PublicRoutes ></PublicRoutes>
  )
}

export default App
