import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  const testApi = () =>{
    fetch("http://localhost:8000/api").then(response => response.json())
                  .then(data => console.log(data))
  }
  return (
        <button onClick={testApi}>
          Test Api
        </button>
  )
}

export default App
