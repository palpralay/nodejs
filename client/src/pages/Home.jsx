import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>Home
      <div className='flex gap-2 text-blue-600'>
        <Link to="/contact">Contact</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  )
}

export default Home