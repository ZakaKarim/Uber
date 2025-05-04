import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home.jsx";
import UserProtectWrapper from "./pages/UserProtectWrapper.jsx";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper.jsx";
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        }/> 
        <Route path="/captain/logout" element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
        }/>
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
