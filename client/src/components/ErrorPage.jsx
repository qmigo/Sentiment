import React from 'react'
import errorPart from '../utils/error.gif'
function ErrorPage() {
  return (
    <div className='ErrorPage bg-white'>
      <img className='mx-auto' src={errorPart} alt="error" />
    </div>
  )
}

export default ErrorPage
