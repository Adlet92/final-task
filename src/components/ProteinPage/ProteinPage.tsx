import "./ProteinPage.css"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, Route, Routes, useParams } from "react-router-dom";
import DetailsPage from "src/components/ProteinPage/DetailsPage/DetailsPage";
import Header from "src/components/Header/header";


export interface ProteinPageProps {
    uniProtkbId: string;
    organism: { scientificName: string };
    proteinDescription: { recommendedName: { fullName: { value: string } } };
    genes: [{ geneName: { value: string }; synonyms?: [{ value: string }] }];
  }


const ProteinPage = () => {
    const { proteinId } = useParams();
    const [results, setResults] = useState<ProteinPageProps | null>(null);
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        const fetchData = async () => {
        try {
            const apiUrl = `https://rest.uniprot.org/uniprotkb/${proteinId}`;
            const response = await axios.get(apiUrl);

            setResults(response.data)
        } catch (error) {
            console.log(error)
        }
        }

        fetchData()
    }, [proteinId])

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
      };


    return (
        <div className="protein-container">
            <Header/>
            <div className="protein-header">
                <div className="proteinId">
                    {proteinId + " / " + results?.uniProtkbId}
                </div>
                <div className="scientificNameProtein">
                    {results?.organism?.scientificName}
                </div>
            </div>
            <div className="protein-subheader">
                <div className="protein">
                    Protein
                </div>
                <div className="description">
                    {results?.proteinDescription?.recommendedName?.fullName?.value}
                </div>
                <div className="protein-genes">
                    Gene
                </div>
                <div className="genesName">
                    {results?.genes ? (
                    results?.genes.map((gene, num) => (
                      <span key={num}>
                        {gene.geneName?.value}
                        {gene.synonyms && gene.synonyms.length > 0 && (
                          <span>, {gene.synonyms[0].value}</span>
                        )}
                      </span>
                    ))
                  ) : (
                    "no genes data"
                  )}
                </div>
            </div>
            <div className="protein-main">
                <Link
                    to={`./details`}
                    className={activeLink === "details" ? "active-details" : "not-active-details"}
                    onClick={() => handleLinkClick("details")}
                    >
                        Details
                </Link>
                <Link
                    to={`./feature`}
                    className={activeLink === "feature" ? "active-feature" : "not-active-feature"}
                    onClick={() => handleLinkClick("feature")}
                    >
                        Feature Viewer
                </Link>
                <Link
                    to={`./publications`}
                    className={activeLink === "publications" ? "active-publications" : "not-active-publications"}
                    onClick={() => handleLinkClick("publications")}
                    >
                        Publications
                </Link>
            </div>
            <Routes>
                <Route path="details" element={<DetailsPage proteinData={results}/>}/>
                <Route path="feature"/>
                <Route path="publications"/>
            </Routes>
      </div>
    )
}

export default ProteinPage
