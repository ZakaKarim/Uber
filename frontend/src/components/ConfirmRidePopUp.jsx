import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
            props.setConfirmRidePopPanel(false)
            props.setRidePopPanel(false) 
            navigate('/captain-riding', { state: { ride: props.ride } });
        }


  };

  return (
    <div>
      <h1
        className="p-1 text-center top-0 w-[95%] absolute"
        onClick={() => {
          props.setConfirmRidePopPanel(false);
          //props.setRidePopPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h1>
      <h2 className="font-medium text-2xl mb-5">Confirm this Ride</h2>

      <div className="flex items-center justify-between bg-yellow-400 rounded-lg mt-3 p-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbqkj7uqS4RFpZZfPRu50xIJY9gss2dqAOg&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.54km</h5>
      </div>

      <div className="flex gap-3 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <p className="text-gray-600 text-base -mt-1">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
            {/* <i className="text-lg ri-map-pin-2-fill"></i> */}
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
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
        <div className="mt-4 p-3 rounded-lg w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              type="text"
              className="bg-[#eeee] px-6 py-3 font-mono w-full text-lg items-center rounded-lg mt-3"
              placeholder="Enter OTP"
            />
            <button
              onClick={() => {
                props.setConfirmRidePopPanel(false);
                props.setRidePopPanel(false);
              }}
              className="w-full text-lg mt-5 bg-red-600 text-white font-semibold p-3 rounded-lg"
            >
              Cancel Ride
            </button>
            <button
              //to="/captain-riding"
              className="w-full text-lg mt-2 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Confirm Ride
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
