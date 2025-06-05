import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

  const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }
  
  return (
       <div>
          <h1
            className="p-1 text-center top-0 w-[95%] absolute"
            onClick={() => {
              props.setFinishRidePanel(false);
              //props.setRidePopPanel(false);
            }}
          >
            <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
          </h1>
          <h2 className="font-medium text-2xl mb-5">Finish this Ride</h2>
    
          <div className="flex items-center justify-between border-3 border-yellow-400 rounded-lg mt-3 p-3">
            <div className="flex items-center gap-3 ">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbqkj7uqS4RFpZZfPRu50xIJY9gss2dqAOg&s"
                alt=""
              />
              <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
            </div>
            {/* <h5 className="text-lg font-semibold">2.54km</h5> */}
          </div>
    
          <div className="flex gap-3 justify-between items-center flex-col">
            <div className="w-full mt-5">
              <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">562-11-A</h3>
                  <p className="text-gray-600 text-base -mt-1">
                    {props.ride?.pickup}
                  </p>
                </div>
              </div>
    
              <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
                {/* <i className="text-lg ri-map-pin-2-fill"></i> */}
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">E26/25-4</h3>
                  <p className="text-gray-600 text-base -mt-1">
                    {props.ride?.destination}
                  </p>
                </div>
              </div>
    
              <div className="flex items-center gap-5 mt-2 p-3">
                <i className="text-lg ri-currency-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">Pkr:{props.ride?.fare}</h3>
                  <p className="text-gray-600 text-base -mt-1">Discount Rate</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-3 rounded-lg w-full">
                <button
                onClick={endRide}
                  // to="/captain-home"
                  className="w-full mt-2  text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
                >
                Finish Ride
                </button>
                <p className='mt-6 text-xs p-4'>Click on finish ride button if you have receive the payment</p>
            </div>
          </div>
        </div>
  )
}

export default FinishRide