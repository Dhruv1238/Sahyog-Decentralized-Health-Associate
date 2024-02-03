import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from '@material-tailwind/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=' flex flex-col items-center justify-center min-h-screen bg-black'>
        <Button color='blue' ripple='light' onClick={() => setCount(count + 1)}>
          Count is: {count}
        </Button>
      </div>
    </>
  )
}

export default App
