import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRed = useRef(null);

  // GSAP TO OPEN THE ConfirmRidePopPanel
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRed.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRed.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative">
      <div className="fixed p-4 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          srcset=""
        />
        <Link
          to="/captain-login"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          srcset=""
        />
      </div>
      <div
        className="h-1/5 p-6 bg-yellow-400  flex items-center justify-between relative"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h1
          className="p-1 text-center top-0 w-[90%] absolute"
          onClick={() => {}}
        >
          <i className="text-4xl text-gray-400 ri-arrow-down-wide-fill"></i>
        </h1>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3  px-10 rounded-lg">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRed}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12"
      >
        <FinishRide />
      </div>
    </div>
  );
};

export default CaptainRiding;
