import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  
  const nav=useNavigate();

  return (

    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-center items-center space-x-4 '>
      <button onClick={()=>nav('/register')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>SignUp</button>
      <button onClick={()=>nav('/login')} className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded'>Login</button>
      </div>
    </div>
  )
}

export default Homepage
