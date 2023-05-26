import "../pages/MainPage.css"

import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext";

const MainPage = () => {
  const navigate = useNavigate()
  const { user } = UserAuth();

    const handleLogin = () => {
      if (user) {
        navigate("/search");
      } else {
        navigate("/auth/signin");
      }
    };

  return (
    <div className="mainPage">
      <div className="textArea">
        <h1 className="labelName">{"Q-1 Search"}</h1>
        <p className="descText">
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"}
          {"eiusmod tempor incididunt u"}
        </p>
        <button onClick={handleLogin} className="loginButton">
          {"Login"}
        </button>
      </div>
    </div>
  )
}

export default MainPage
