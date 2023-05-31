import "./MainPage.css"
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../../context/AuthContext";
import { routes } from "src/utils/routes";

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  const auth = UserAuth();
  const user = auth && auth.user;

    const handleLogin = () => {
      if (user) {
        navigate(routes.search);
      } else {
        navigate(routes.signin);
      }
    };

  return (
    <div className="mainPage">
      <div className="textArea">
        <h1 className="labelName">Q-1 Search</h1>
        <p className="descText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt u
        </p>
        <button onClick={handleLogin} className="loginButton">
          Login
        </button>
      </div>
    </div>
  )
}

export default MainPage
