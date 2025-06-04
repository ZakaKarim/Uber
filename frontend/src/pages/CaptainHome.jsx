import React, { useRef, useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainHome = () => {

  const [ridePopPanel, setRidePopPanel] = useState(false);
  const [confirmridePopPanel, setConfirmRidePopPanel] = useState(false);


  const RidePopPanelRef = useRef(null)
  const ConfirmRidePopPanelRef = useRef(null)
  const [ride, setRide] = useState(null)


  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
   console.log("captain",captain)
   socket.emit("join",{ userType: "captain",userId: captain._id})

     const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                  console.log({
                    userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                  })

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

         //return () => clearInterval(locationInterval)
  
  }, [])

  socket.on('new-ride', (data) => {

    console.log("New ride request received:", data);

        setRide(data)
        setRidePopPanel(true)

    })

     async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopPanel(false)
        setConfirmRidePopPanel(true)

    }

  

  // GSAP TO OPEN THE RidePopPanel
  useGSAP(
    function () {
      if (ridePopPanel) {
        gsap.to(RidePopPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RidePopPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopPanel]
  );

   // GSAP TO OPEN THE ConfirmRidePopPanel 
  useGSAP(
    function () {
      if (confirmridePopPanel) {
        gsap.to(ConfirmRidePopPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePopPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmridePopPanel]
  );


  return (
    <div className="h-screen">
      <div className="fixed p-4 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-login"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={RidePopPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
        <RidePopUp
          ride={ride}
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={ConfirmRidePopPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
          setRidePopPanel={setRidePopPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
