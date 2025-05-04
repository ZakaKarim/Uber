import React, { useRef, useState } from 'react'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'

const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("") 
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function(){
   if(panelOpen){
    gsap.to(panelRef.current,{
      height:"70%"
    })
   }
   else{
    gsap.to(panelRef.current,{
      height:"0%"
    })
   }
  },[panelOpen])

  return (
    <div className='h-screen relative'>
      <img
        className="w-18 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo is loading"
        srcset=""
      />
      <div className='h-screen w-screen'>
        {/* <img className='h-full w-full object-cover' src="https://t3.ftcdn.net/jpg/07/28/30/26/360_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt="" srcset="" /> */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" srcset="" />
      </div>
      <div className='flex flex-col justify-end  h-screen absolute top-0 w-full'>
        <div className='h-[30%] bg-white  p-5 relative'>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line bg-black absolute h-15 w-1 top-[45%] left-10 rounded-full"></div>
            <input
            onClick={()=>{
              setPanelOpen(true)
            }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value)
              }}
              className='bg-[#eeee] px-12 py-2 w-full text-lg rounded-lg mt-5'
              type="text"
              placeholder='Add a Pickup Location'
            />
            <input
             onClick={()=>{
              setPanelOpen(true)
            }}
            value={destination} 
            onChange={(e)=>{
              setDestination(e.target.value)
            }}
            className='bg-[#eeee] px-12 py-2 w-full text-lg rounded-lg mt-5' 
            type="text"
             placeholder='Enter your Destination' 
             />
          </form>
        </div>
        <div  ref={panelRef} className='h-[0%] bg-red-500 '>
        </div>
      </div>
    </div>
  )
}

export default Home