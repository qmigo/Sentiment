import React, { useEffect } from 'react'

function SuccessPage({metric}) {
  useEffect(()=>{
    console.log(metric)
  }, [])
  
  function parseLikes(likes) {
    
    if (likes >= 1e9) {
      return (likes / 1e9).toFixed(1) + 'B';
    } else if (likes >= 1e6) {
        return (likes / 1e6).toFixed(1) + 'M';
    } else if (likes >= 1e3) {
        return (likes / 1e3).toFixed(1) + 'K';
    } else {
        return likes.toString();
    }
  }
  return (
    <div className='success-page flex  bg-white mt-5'>
      <div className='information flex-1 border'>
        <div className='img-wrapper flex flex-col items-center my-3'>
          <img src={metric[1]?.thumbnail} alt="thumbnail" className='w-1/2 object-contain'/>
          <span className='text-xl font-bold text-gray-800 text-justify flex '><span className='p-1'>{parseLikes(metric[1]?.likes)}</span> <span className='p-1'>👍</span></span>
        </div>
        <div className="content-wrapper">
          <h1 className='text-3xl font-bold my-2 text-center text-gray-900'>{metric[1]?.title}</h1>
          <p className='text-m text-gray-700 text-justify p-2'>{metric[1]?.description}</p>
        </div>
        
      </div>
      <div className='analysis flex-1'></div>
    </div>
  )
}

export default SuccessPage
