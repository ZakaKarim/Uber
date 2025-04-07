import React from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-26 ml-2 mb-4 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo is loading"
          srcset=""
        />
        <form>
          <h3 className="text-xl font-bold mb-2">Enter your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 py-4 text-lg w-full placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-xl font-bold mb-2">Enter password</h3>
          <input
            required
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
            New to Uber?
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <button className="flex justify-center text-2xl w-full bg-black text-white py-3 rounded mt-9">
          Login as Captain
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
