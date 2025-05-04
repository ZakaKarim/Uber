import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Response in logout route is this:", response);
      if (response.status === 200) {
        localStorage.removeItem("token");
      }
      navigate("/login");
    });

  console.log("token in logout route", token);
  return <div>UserLogout</div>;
};

export default UserLogout;
