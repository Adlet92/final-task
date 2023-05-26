import "../pages/SearchPage.css"

import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { UserAuth } from "../context/AuthContext"
import SearchResults from "./SearchResults"

const SearchPage = () => {
  const { user, logout } = UserAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    setSearchQuery(query || "");
    setSubmittedQuery(query || "");
  }, [location.search]);

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    const emptyQuery = trimmedQuery !== "" ? trimmedQuery : "*"
    
    setSubmittedQuery(emptyQuery);
    navigate(`/search?query=${encodeURIComponent(emptyQuery)}`);
  }

  return (
    <div className="search-page">
      <div className="header">
        <div className="frame4">
          <div className="account-label">{user && user.email}</div>
          <button className="logout-button" onClick={handleLogout}>
            {"Log Out"}
          </button>
        </div>
      </div>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Enter search value"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" type="submit">
            {"Search"}
          </button>
          <button className="filter-button" />
        </form>
      </div>
      <div className="search-result">
        {!submittedQuery && (
          <div className="no-result">
            <p className="upper-text">
              {"Please start a search to display results"}
            </p>
            <p className="bottom-text">{"No data to display"}</p>
          </div>
        )}
        {submittedQuery && <SearchResults query={submittedQuery} />}
      </div>
    </div>
  )
}

export default SearchPage
