import React, { useContext, useEffect } from "react";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  //Phel user use kiya tha than if the user update the page to wo logout ho jay gay
  //so to overcome that problem we use Token of the login user
  //   const { user } = useContext(UserContextData);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("token in UserProtectWrapper", token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  // console.log("token in UserProtectWrapper", token);

  // if (!token) {
  //   navigate("/login");
  // }
  // console.log("children", children);
  return <>{children}</>;
};

export default UserProtectWrapper;
