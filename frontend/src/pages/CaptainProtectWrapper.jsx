import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from "../context/CaptainContext"
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  //Phel user use kiya tha than if the cptain update the page to wo logout ho jay gay
  //so to overcome that problem we use Token of the login captin
  //   const { user } = useContext(UserContextData);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("token in CaptainProtectWrapper", token);

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    // 1. Check if token exists

    if (!token) {
      navigate("/captain-login");
    }
    // 2. If token exists, fetch captain profile
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // Send token for authentication
      }
    }).then(response => {
      if (response.status === 200) {
        setCaptain(response.data.captain) // Save captain data to context
        setIsLoading(false) // Stop loading
        console.log("setCaptan", setCaptain)
      }
    })
      .catch(err => {
        console.log("error", err)
        // If request fails (invalid token, server error, etc.)
        localStorage.removeItem('token') // Remove bad token
        navigate('/captain-login') // Go back to login
      })

  }, [token]);

  if (isLoading) {
    return (
      <div>Loading....CaptainData....</div>
    )
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper
