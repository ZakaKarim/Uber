import React from "react";
import axios from "axios";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContextData } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData, setUserData] = useState({})

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContextData)


  const submitHandle =async (e)=>{
    e.preventDefault()
    // console.log("email", email, "password", password)
  const userData = {
    email: email,
    password: password
  }

   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);
    if(response.status === 200){
      const data = response.data;
  
      setUser(data.user);
  
      //Naviage to Home Page if everything goes well 
      navigate('/home')
    }
 // console.log("userData", userData)
    setEmail("")
    setPassword("")

    
    
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-26 ml-2 mb-4 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo is loading"
          srcset=""
        />
        <form onSubmit={(e)=>{
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
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link to={"/captain-login"} className="flex justify-center text-2xl w-full bg-black text-white py-3 rounded mt-9">
          Login as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
