import { useEffect, useState, useRef } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from 'axios'
import './index.css'
import cover from './utils/youtube.png'
import ErrorPage from './components/ErrorPage';
import SuccessPage from './components/SuccessPage';
import LoaderPage from './components/LoaderPage';

function App() {

  const [videoId, setVideoId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const inputRef = useRef();
  

  const getSentiments = async () => {
    if (isLoading=== true)
    {
      return
    }

    if(videoId === null) {
      alert("Enter a valid Video Id")
      return;
    }

    else {
      try {
        setIsLoading(true)
        const axiosInstance = axios.create({
          withCredentials: true,
        });
        
        const {data} = await axiosInstance.get('http://127.0.0.1:8000/api/v1/getFeedback', {
          params: {
            videoId: videoId,
          },
        });
        console.log(data, data.metric)
        setData(data.metric)
      } catch (error) {
        console.log(error)
        setData(false)
      }
      setIsLoading(false)
      inputRef.current.value = '';

    }
  }
  return (
    <div className='bg-color h-full'>
      <div className="w-100 bg-color py-2 text-white flex justify-between">
        <div className='flex cursor-pointer'>
          <div className='boxed-border text-3xl  my-auto ml-4 mr-1 border border-white w-8 text-center'>S</div>
          <span className='my-auto'>entiment</span>
        </div>
        <div className='w-80 border flex justify-around'>
          <input ref={inputRef} id='input' className='w-full bg-transparent mx-1 outline-white p-1 placeholder-white text-white focus:border-none focus:outline-none active:border-none' type="text" placeholder="Enter VideoId from Youtube" onChange={(e)=>{setVideoId(e.target.value)}}/>
          <span className='search h-full flex' style={{cursor: (isLoading===true?"not-allowed":"pointer")}} onClick={getSentiments}><CiSearch className='text-white text-3xl font-bold mx-1 my-auto'/></span>
        </div>
        <div className='text-xl mx-10 cursor-pointer'>Docs</div>
      </div>
      {
      isLoading===true?
      <LoaderPage></LoaderPage>
      :
      data === null?
      <div className='banner w-full'>
        <img src={cover} alt="youtube" className='h-screen mx-auto'/>
      </div>
      : data === false ?
      <ErrorPage>
      </ErrorPage>:
      <SuccessPage metric = {data}>
      </SuccessPage>
      }
    </div>
  )
}

export default App
