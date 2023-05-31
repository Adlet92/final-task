import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProteinPublications } from "src/api/api";
import Icon from '../../../assets/iconExternal.svg'
import { v4 as uuidv4 } from "uuid";
import './Publications.css'
import Loading from "src/components/Loading/Loading";
import { toast } from "react-toastify";

type Link = {
  database: string;
  id: string;
};

interface PublicationResponse {
  results: PublicationInfo[];
}

interface Reference {
  referencePositions: string[];
  sourceCategories: string[];
  source: { name: string };
}

interface PublicationInfo {
  citation: {
    authors: string[];
    citationCrossReferences: Link[];
    title: string;
    journal: string;
    volume: string;
    firstPage: string;
    lastPage: string;
    publicationDate: string;
  };
  references: Reference[];
}

const Publications: React.FC = () => {
  const { proteinId = "" } = useParams();
  const [publicationsInfo, setPublicationsInfo] = useState<PublicationResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPublications = async () => {
    try {
      const proteinPublications = await fetchProteinPublications(proteinId);
      setPublicationsInfo(proteinPublications);
      setIsLoading(false);
    } catch (error) {
      toast.error(error as string);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [proteinId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!publicationsInfo || publicationsInfo.results.length === 0) {
    return <div>No publications available.</div>;
  }

  const renderLinks = (citationCrossReferences: Link[] = [], citation: PublicationInfo['citation']) => {
    const hasDOILink = citationCrossReferences.some((link) => link.database === "DOI");

    if (citationCrossReferences.length === 0) {
      return null;
    }
  
    return citationCrossReferences.map((link, index) => {
      if (link.database === "PubMed") {
        return (
          <div key={index} className="containerLink">
            <a href={`https://pubmed.ncbi.nlm.nih.gov/${link.id}`} target="_blank" rel="noopener noreferrer">
              PubMed
            </a>
            <img src={Icon} alt="Icon" />
          </div>
        );
      } else if (link.database === "DOI") {
        return (
          <div key={index} className="containerLink">
            <a href={`https://dx.doi.org/10.1038/${link.id}`} target="_blank" rel="noopener noreferrer">
              {`${citation.journal} ${citation.volume}:${citation.firstPage}-${citation.lastPage} (${citation.publicationDate})`}
            </a>
            <img src={Icon} alt="Icon" />
          </div>
        );
      } else if (link.database === "Europe PMC") {
        return (
          <div key={index} className="containerLink">
            <a href={`https://europepmc.org/article/MED/${link.id}`} target="_blank" rel="noopener noreferrer">
              Europe PMC
            </a>
            <img src={Icon} alt="Icon" />
          </div>
        );
      } else {
        return null;
      }
    }).concat(!hasDOILink ? (
      <div key="inactiveDOI" className="containerLink inactiveLink">
        <span>
          {`${citation.journal} ${citation.volume}:${citation.firstPage}-${citation.lastPage} (${citation.publicationDate})`}
        </span>
      </div>
    ) : null);
  };
  
  

  return (
        <div className="publication-container">
          {publicationsInfo?.results.map((publication) => (
            <div key={uuidv4()} className="public">
              {publication.citation.title && (
                <div className="title-publication">{publication.citation.title}</div>
              )}
              {publication.citation.authors && (
              <div className="authors-publication">{publication.citation.authors.join(", ")}</div>
                )}
              {publication.references[0].sourceCategories && (
                 <div className="categories-publication">
                 Categories: {publication.references[0].sourceCategories.join(", ")}
                  </div>
              )}
               {publication.references[0].referencePositions && (
                <div className="cited">
                <p className="cited-for">
                  Cited for:{" "}
                  <span className="reference-positions">
                    {publication.references[0].referencePositions.join(", ")}
                  </span>
                </p>
              </div>
               )}
              {publication.references[0].source.name && (
                <div className="source-name">
                <p className="source">
                  Source name:{" "}
                  <span>
                    {publication.references[0].source.name}
                  </span>
                  </p> 
                </div>
              )}
                  <div className="links-container">
                     {renderLinks(publication.citation.citationCrossReferences, publication.citation)}
              </div>
            </div>
          ))}
        </div>
  );
};

export default Publications;
