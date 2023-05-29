import React, { useState } from 'react'

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
