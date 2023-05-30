import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "src/components/Header/Header";
import "./PageNotFound.css";
import { routes } from "src/utils/routes";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBackToSearch = () => {
    navigate(routes.search);
  };

  return (
    <>
      <Header />
      <div className="notFound-container">
        <div className="title-404">404</div>
        <div className="page-not-found">Page not found</div>
        <button className="back-button" onClick={handleBackToSearch}>
          Back to Search
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
