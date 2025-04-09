import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});
    const submitHandle = (e) => {
      e.preventDefault();
      // console.log("email", email, "password", password);
      setUserData({
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password,
      });
      //console.log("userData", userData);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
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
            {/* if you are using button than the require word wil work on the field but if you are using 
               Link tag than it will not work so far  */}
            <button className="flex justify-center text-2xl w-full bg-black text-white py-3 rounded mt-5">
              Sign Up
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
