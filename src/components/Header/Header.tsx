import { useNavigate } from "react-router-dom";
import { routes } from "src/utils/routes";
import { UserAuth } from "../../context/AuthContext";
import './header.css';

interface HeaderProps {
  backButton: boolean;
}

const Header = ({ backButton }: HeaderProps) => {
  const auth = UserAuth();
  const user = auth && auth.user;
  const logout = auth && auth.logout;
  const navigate = useNavigate();

  const handleBackToSearch = () => {
    navigate(routes.search);
  };
  // const handleBackToSearch = () => {
  //   navigate(`${routes.search}?query=${query}`);
  // };


  const handleLogout = () => {
    if (logout) {
      logout().then(() => navigate(routes.main));
    }
  };

  return (
    <div className="header">
        <div className="frame4">
        {backButton && <button className="back-to-search-button"  onClick={handleBackToSearch}>Back to search</button>}
          <div className="account-label">{user && user.email}</div>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
  );
};

export default Header;
