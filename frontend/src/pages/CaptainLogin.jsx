import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [captainData, setCaptainData] = useState("")
    const submitHandle = (e)=>{
      e.preventDefault()
    // console.log("email", email, "password", password)
      setCaptainData({
        email: email,
        password: password
      })
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
