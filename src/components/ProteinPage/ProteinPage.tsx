import "./ProteinPage.css"

import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom";
import DetailsPage from "src/components/ProteinPage/DetailsPage/DetailsPage";
import Header from "src/components/Header/Header";
import { fetchProteinDetails } from "src/api/api";
import Loading from "src/components/Loading/Loading";
import Publications from "src/components/ProteinPage/Publications/Publications";
import Feature from "src/components/ProteinPage/Feature/Feature";


export interface ProteinPageProps {
    uniProtkbId: string;
    organism: { scientificName: string };
    proteinDescription: { recommendedName: { fullName: { value: string } } };
    genes: [{ geneName: { value: string }; synonyms?: [{ value: string }] }];
  }

enum Tab {
    Details = "details",
    Feature = "feature",
    Publications = "publications",
}

const ProteinPage = () => {
    const { proteinId } = useParams();
    const [results, setResults] = useState<ProteinPageProps | null>(null);
    const [activeTab, setActiveTab] = useState<Tab | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const proteinDetails = await fetchProteinDetails(proteinId);
            setResults(proteinDetails);
            
        } catch (error) {
            console.log(error)
        }
        }

        fetchData()
    }, [proteinId])

    useEffect(() => {
        const tabFromPath = location.pathname.split("/").pop();
        if (tabFromPath && Object.values(Tab).includes(tabFromPath as Tab)) {
          setActiveTab(tabFromPath as Tab);
        } else {
          setActiveTab(null);
        }
      }, [location]);


      useEffect(() => {
        const handlePopstate = () => {
          // Refresh the page when the user presses the back button
          window.location.reload();
        };
    
        window.addEventListener("popstate", handlePopstate);
    
        return () => {
          window.removeEventListener("popstate", handlePopstate);
        };
      }, []);

    const handleLinkClick = (tab: Tab) => {
        setActiveTab(tab);
      };

    if (!results) {
        return <Loading />; 
    }


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
                    to={Tab.Details}
                    className={activeTab === Tab.Details ? "active-details" : "not-active-details"}
                    onClick={() => handleLinkClick(Tab.Details)}
                    >
                    Details
                </Link>
                <Link
                    to={Tab.Feature}
                    className={activeTab === Tab.Feature ? "active-feature" : "not-active-feature"}
                    onClick={() => handleLinkClick(Tab.Feature)}
                    >
                    Feature Viewer
                </Link>
                <Link
                    to={Tab.Publications}
                    className={activeTab === Tab.Publications ? "active-publications" : "not-active-publications"}
                    onClick={() => handleLinkClick(Tab.Publications)}
                    >
                    Publications
                </Link>
            </div>
            <div className="tab-pane">
                {activeTab === Tab.Details && <DetailsPage proteinData={results} />}
                {/* {activeTab === Tab.Feature && <Feature />} */}
                {activeTab === Tab.Publications && <Publications />}
            </div>
      </div>
    )
}

export default ProteinPage

