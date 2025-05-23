import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = () => {

  const [ridePopPanel, setRidePopPanel] = useState(true);
  const RidePopPanelRef = useRef(null)

   // GSAP TO OPEN THE RidePopPanel when clicking on icon
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


  return (
    <div className="h-screen">
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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          srcset=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div ref={RidePopPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12">
        <RidePopUp
        setRidePopPanel={setRidePopPanel}
         />
      </div>
    </div>
  );
};

export default CaptainHome;
