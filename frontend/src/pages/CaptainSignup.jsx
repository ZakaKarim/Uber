import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import {CaptainDataContext} from "../context/CaptainContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});

    const [ vehicleColor, setVehicleColor ] = useState('')
    const [ vehiclePlate, setVehiclePlate ] = useState('')
    const [ vehicleCapacity, setVehicleCapacity ] = useState('')
    const [ vehicleType, setVehicleType ] = useState('')
    const navigate =  useNavigate()
  


    const { captain, setCaptain } = useContext(CaptainDataContext)


    const submitHandle = async (e) => {
      e.preventDefault();
      // console.log("email", email, "password", password);
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
      };


      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        captainData
      );
      if(response.status === 201){
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token )

        navigate('/captain-home')
      }

      //console.log("userData", userData);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");

    };
  return (
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-26 ml-2 mb-4 "
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Logo is loading"
            srcset=""
          />
          <form
            onSubmit={(e) => {
              submitHandle(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">Enter your name</h3>
            <div className="flex gap-4  mb-6">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-3 text-lg  placeholder:text-base"
                type="text"
                placeholder="First name"
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-3 border text-lg  placeholder:text-base"
                type="text"
                placeholder="Last name"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">Enter your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-4 text-lg  w-full placeholder:text-base"
              type="email"
              placeholder="Enter your email"
            />
            <h3 className="text-lg font-medium mb-2">Enter password</h3>
            <input
              required
              value={password}
              //onChange={(e) => setPassword(e.target.value)}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="bg-[#eeeeee] mb-6 rounded px-4 py-4 text-lg w-full placeholder:text-base"
              type="password"
              placeholder="Enter your password"
            />
            <h3 className='className="text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-2 py-2 border text-small placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
            {/* if you are using button than the require word wil work on the field but if you are using 
               Link tag than it will not work so far  */}
            <button className="flex justify-center text-2xl w-full bg-black text-white py-3 rounded mt-5">
              Create Captain Account
            </button>
          </form>
          <p className=" text-center mt-5">
              Already have a Account?{" "}
              <Link to="/captain-login" className="text-blue-600">
                Click to Login Here
              </Link>
            </p>
        </div>
        <div>
        <p className=' text-[12px]  leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
  )
}

export default CaptainSignup
