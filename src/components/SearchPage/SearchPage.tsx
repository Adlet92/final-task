import "./SearchPage.css"

import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SearchResults from "../SearchResults/SearchResults"
import Header from "src/components/Header/Header"

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    setSearchQuery(query || "");
    setSubmittedQuery(query || "");
  }, [location.search]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    const emptyQuery = trimmedQuery !== "" ? trimmedQuery : "*"
    
    setSubmittedQuery(emptyQuery);
    navigate(`/search?query=${encodeURIComponent(emptyQuery)}`);
  }

  return (
    <div className="search-page">
      <Header/>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            ref={searchInputRef}
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
