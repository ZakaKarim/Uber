import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useEffect } from "react";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data
  console.log("Ride Data in user:", ride);
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  socket.on("ride-ended",()=>{
    navigate("/home");
  })

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2"
      >
        <i className="text-lg font-medium ri-home-8-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          srcset=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex justify-between items-center">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
            srcset=""
          />
          <div className="text-right">
            <h1 className="text-lg font-medium">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h1>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm font-medium">{ride?.captain.vehicle.vehicleType}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-between items-center flex-col">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
              {/* <i className="text-lg ri-map-pin-2-fill"></i> */}
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">E26/25-4</h3>
                <p className="text-gray-600 text-base -mt-1">
                  {ride?.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 mt-2 p-3">
              <i className="text-lg ri-currency-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Pkr:{ride?.fare}</h3>
                <p className="text-gray-600 text-base -mt-1">Discount Rate</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
