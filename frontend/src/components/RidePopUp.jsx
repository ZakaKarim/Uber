import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h1
        className="p-1 text-center top-0 w-[95%] absolute"
        onClick={() => {
            props.setRidePopPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h1>
      <h2 className="font-medium text-2xl mb-5">New Ride Avaiable!</h2>

      <div className="flex items-center justify-between bg-yellow-400 rounded-lg mt-3 p-3">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbqkj7uqS4RFpZZfPRu50xIJY9gss2dqAOg&s"
            alt=""
          />
          <h2 className="text-lg font-medium">David</h2>
        </div>
        <h5 className="text-lg font-semibold">2.54km</h5>
      </div>

      <div className="flex gap-3 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562-11-A</h3>
              <p className="text-gray-600 text-base -mt-1">
                Model Town Link Road Lahore Cantt{" "}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
            {/* <i className="text-lg ri-map-pin-2-fill"></i> */}
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">E26/25-4</h3>
              <p className="text-gray-600 text-base -mt-1">
                Islam Nagar Walton Road Lahore Cantt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pkr 350</h3>
              <p className="text-gray-600 text-base -mt-1">Discount Rate</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
              props.setRidePopPanel(false);
          }}
          className="w-full text-lg mt-5 bg-gray-500 text-white font-semibold p-2 rounded-lg"
        >
          Reject Ride
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopPanel(true)
          }}
          className="w-full text-lg mt-1 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
