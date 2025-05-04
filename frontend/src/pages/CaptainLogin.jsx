import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from "../context/CaptainContext"
import axios from 'axios'

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captainData, setCaptainData] = useState("")

  const { captain, setCaptain } = useContext(CaptainDataContext)
   const navigate =  useNavigate()

  const submitHandle = async (e) => {
    e.preventDefault()
    // console.log("email", email, "password", password)
    const captain = {
      email: email,
      password: password
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/login`,
      captain
    );

    if(response.status === 200){
      const data = response.data;
      console.log("response", response)

      console.log("response.data", response.data)
      setCaptain(data.captain)
      localStorage.setItem("token", data.token)

      navigate('/captain-home')
    }
    // console.log("captainData", captainData)
    setEmail("")
    setPassword("")

  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-28 ml-2 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Logo is loading"
          srcset=""
        />
        <form onSubmit={(e) => {
          submitHandle(e)
        }}>
          <h3 className="text-xl font-bold mb-2">Enter your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-4 text-lg w-full placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-xl font-bold mb-2">Enter password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-4 text-lg w-full placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />
          {/* if you are using button than the require word wil work on the field but if you are using 
             Link tag than it will not work so far  */}
          <button className="flex justify-center text-2xl w-full bg-black text-white py-3 rounded mt-5">
            Login
          </button>
          <p className=" text-center mt-5">
            New to Uber?{" "}
            <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/login"} className="flex justify-center text-2xl w-full bg-black text-white py-3 rounded mt-9">
          Login as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
