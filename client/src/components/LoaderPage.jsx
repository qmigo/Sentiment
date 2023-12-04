import React from 'react'
import loaderPart from '../utils/load.gif'

function LoaderPage() {
  return (
    <div className='LoaderPage bg-white'>
      <img className='mx-auto' src={loaderPart} alt="loading" />
    </div>
  )
}

export default LoaderPage
