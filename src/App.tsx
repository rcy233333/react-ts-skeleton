import React, { useState } from 'react'

// import Home from './views/home'

function App() {
  const [number, setNumber] = useState<number>(0)

  const handleClick = () => {
    setNumber((prevNum) => prevNum + 1)
  }

  return (
    <div className="App" onClick={handleClick}>
      hello react-ts {number}
    </div>
  )
}

export default App
