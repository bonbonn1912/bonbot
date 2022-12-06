import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { TailwindTest } from './Components/TailwindTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TailwindTest/>
  )
}

export default App
