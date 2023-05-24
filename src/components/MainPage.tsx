import React from "react";
import { useNavigate } from "react-router-dom";
import '../pages/MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        try {
            // await login();
            navigate('/auth/signin');
        }catch (e: any){
            console.log(e.message)
        }
    }

    return (
        <div className="mainPage">
            <div className="textArea">
                <h1 className="labelName">Q-1 Search</h1>
                <p className="descText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u</p> 
                {/* <p className="descText2">adipiscing elit, sed do eiusmod tempor</p> 
                <p className="descText3">incididunt u</p> */}
                <button onClick={handleLogin} className="loginButton">Login</button>
            </div>
        </div>
    )
}

export default MainPage