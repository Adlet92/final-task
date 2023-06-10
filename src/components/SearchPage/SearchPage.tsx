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
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<string>("");
  const [filterButtonClicked, setFilterButtonClicked] = useState<boolean>(false);
  const [hasSearchResults, setHasSearchResults] = useState<boolean>(false);

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

    if (emptyQuery !== submittedQuery) {
      setFilters("");
    }

    setSubmittedQuery(emptyQuery);
    setSearchParams({ query: encodeURIComponent(emptyQuery) });
  }

  const handleOpenModal = () => {
    setShowFilters((prevShowFilters) => !prevShowFilters);
    setFilterButtonClicked((prevButtonClicked) => !prevButtonClicked);
  };

  const handleCloseModal = () => {
    setShowFilters(false);
    setFilterButtonClicked(false);
  };
  const applyFilters = (filters: string) => {
    const filtersArray = filters.split(" AND ");
    const uniqueFilters = Array.from(new Set(filtersArray));
    const updatedFilters = uniqueFilters.join(" AND ");
    setFilters(updatedFilters);
  };

  const isSearchEmpty = searchQuery.trim() === "";

  return (
    <div className="search-page">
      <Header backButton={false} />
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
        </form>
        <button
          className={`filter-button ${
            filterButtonClicked ? "active-button-filter" : ""
          } ${isSearchEmpty || !hasSearchResults ? "disabled" : ""}`}
          onClick={handleOpenModal}
          disabled={isSearchEmpty || !hasSearchResults}
        />
          { filters && <div className="elipse"></div>}
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
        {submittedQuery && <SearchResults query={submittedQuery} filters={filters} setHasSearchResults={setHasSearchResults}/>}
      </div>
      {showFilters && <FilterModal query={submittedQuery} closeModal={handleCloseModal} applyFilters={applyFilters} filters={ filters} />}
    </div>
  )
}

export default SearchPage
