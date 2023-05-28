import React from "react";
import { UserAuth } from "../../context/AuthContext";
import './header.css'

const Header = () => {
  const { user, logout } = UserAuth();

  return (
    <div className="header">
        <div className="frame4">
          <div className="account-label">{user && user.email}</div>
          <button className="logout-button" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
  );
};

export default Header;
