import React from "react";

const LookingForDrive = (props) => {
  return (
    <div>
      <h1
        className="p-1 text-center top-0 w-[95%] absolute"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </h1>
      <h2 className="font-medium text-2xl mb-5">Looking For Drive</h2>

      <div className="flex gap-3 justify-between items-center flex-col">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
          srcset=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562-11-A</h3>
              <p className="text-gray-600 text-base -mt-1">
                {props.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 p-3 border-b-1">
            {/* <i className="text-lg ri-map-pin-2-fill"></i> */}
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">E26/25-4</h3>
              <p className="text-gray-600 text-base -mt-1">
                {props.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-2 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pkr:{props.fare[props.vehicleType]}</h3>
              <p className="text-gray-600 text-base -mt-1">Discount Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDrive;
