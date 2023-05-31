import React from "react";
import { UserAuth } from "../../context/AuthContext";
import './header.css'
import { routes } from "src/utils/routes";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  backButton: boolean;
}



const Header = ({ backButton }: HeaderProps) => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleBackToSearch = () => {
    navigate(routes.search);
  };

  return (
    <div className="header">
        <div className="frame4">
        {backButton && <button className="back-to-search-button"  onClick={handleBackToSearch}>Back to search</button>}
          <div className="account-label">{user && user.email}</div>
          <button className="logout-button" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
  );
};

export default Header;
