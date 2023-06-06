import "./SearchPage.css"

import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import FilterModal from "src/components/Filters/FilterModal"
import Header from "src/components/Header/Header"
import SearchResults from "../SearchResults/SearchResults"

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowMFilters] = useState<boolean>(false);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setSearchQuery(query);
    setSubmittedQuery(query);
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
    setSearchParams({ query: encodeURIComponent(emptyQuery) });
  }
  const handleOpenModal = () => {
    setShowMFilters(true);
  };

  const handleCloseModal = () => {
    setShowMFilters(false);
  };

  return (
    <div className="search-page">
      <Header backButton={false}/>
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
            Search
          </button>
          <button className="filter-button" onClick={handleOpenModal} />
        </form>
      </div>
      <div className="search-result">
        {!submittedQuery && (
          <div className="no-result">
            <p className="upper-text">
              Please start a search to display results
            </p>
            <p className="bottom-text">No data to display</p>
          </div>
        )}
        {submittedQuery && <SearchResults query={submittedQuery} />}
      </div>
      {showFilters && <FilterModal onClose={handleCloseModal} />}
    </div>
  )
}

export default SearchPage
