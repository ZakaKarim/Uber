import React, { useContext, useEffect,useState } from "react";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  //Phel user use kiya tha than if the user update the page to wo logout ho jay gay
  //so to overcome that problem we use Token of the login user
  //   const { user } = useContext(UserContextData);
  const { user, setUser } = useContext(UserContextData)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("token in UserProtectWrapper", token);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    // 1. Check if token exists
    if (!token) {
      navigate("/login");
    }
    // 2. If token exists, fetch user profile
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}` // Send token for authentication
          }
        }).then(response => {
          if (response.status === 200) {
            setUser(response.data.user) // Save captain data to context
            setIsLoading(false) // Stop loading
          }
        })
          .catch(err => {
            console.log("error", err)
            // If request fails (invalid token, server error, etc.)
            localStorage.removeItem('token') // Remove bad token
            navigate('/login') // Go back to login
          })
    
  }, [token]);

  // if (isLoading) {
  //   <div>User Data is Loading.....</div>
  // }

  // console.log("token in UserProtectWrapper", token);

  // if (!token) {
  //   navigate("/login");
  // }
  // console.log("children", children);
  return <>{children}</>;
};

export default UserProtectWrapper;
