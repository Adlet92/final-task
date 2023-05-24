import React from "react";
import {UserAuth} from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import '../pages/SearchPage.css'

const SearchPage = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        }catch (e){
            console.log(e.message)
        }
    }

    return (
        <div className="search-page">
            <div className="header">
                <div className="frame4">
                    <div className="account-label">{user && user.email}</div>
                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Enter search value"/>
                <button className="search-button">Search</button>
                <button className="filter-button"></button>
            </div>
            <div className="search-result">
                <p className="upper-text">No data to display</p>
                <p className="bottom-text">Please start search to display results</p>
            </div>
        </div>
    )
}

export default SearchPage