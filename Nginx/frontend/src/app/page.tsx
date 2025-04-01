'use client'
// frontend/src/app/page.tsx
import {useState, useEffect} from 'react'


const HomePage = () => {

  const [time, setTime] = useState(0)
  useEffect(()  => {
    const timer = setInterval(() => {
        setTime((prev) => prev+1) 
    },1000)

    return() => clearInterval(timer); 
  },[]) 

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
   <> 
    <h1> Hello Docker Next.js Nginx Python</h1>
    <p> Time: {minutes}分{seconds}秒 </p>
  </> 
  )
}

export default HomePage;
