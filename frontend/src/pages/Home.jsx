import React, { useRef, useState } from 'react'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'

const Home = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)


  const submitHandler = (e) => {
    e.preventDefault()
  }

  // GSAP TO OPEN THE Panel when clicking on the pick and destination loaction to show some locations
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: "0%"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])


  // GSAP TO OPEN THE Panel when clicking on the location to open the vehicle panel
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])


  // GSAP TO OPEN THE Confirm vehicle Panel when clicking on any vehicle type 
  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])



  return (
    <div className='h-screen relative overflow-hidden'>
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
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity:0 top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Book Your Ride</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line bg-black absolute h-15 w-1 top-[45%] left-10 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eeee] px-12 py-2 w-full text-lg rounded-lg mt-5'
              type="text"
              placeholder='Add a Pickup Location'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eeee] px-12 py-2 w-full text-lg rounded-lg mt-5'
              type="text"
              placeholder='Enter your Destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='h-[0%] bg-white'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
        </div>
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmedRide setConfirmRidePanel={setConfirmRidePanel} />
        </div>
    </div>
  )
}

export default Home