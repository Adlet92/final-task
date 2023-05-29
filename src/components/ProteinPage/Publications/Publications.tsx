import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProteinPublications } from "src/api/api";
import Icon from '../../../assets/iconExternal.svg'
import { v4 as uuidv4 } from "uuid";
import './Publications.css'
import Loading from "src/components/Loading/Loading";

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
  };
  references: Reference[];
}

const Publications = () => {
  const { proteinId } = useParams();
  const [publicationsInfo, setPublicationsInfo] = useState<PublicationResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPublications = async () => {
    try {
      const proteinPublications = await fetchProteinPublications(proteinId);
      setPublicationsInfo(proteinPublications);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [proteinId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
        <div className="publication-container">
          {publicationsInfo?.results.map((publication) => (
            <div key={uuidv4()} className="public">
              <div className="title-publication">{publication.citation.title}</div>
              <div className="authors-publication">{publication.citation.authors.join(", ")}</div>
              <div className="categories-publication">
                Categories: {publication.references[0].sourceCategories.join(", ")}
              </div>
              <div className="cited">
                <p className="cited-for">
                  Cited for:{" "}
                  <span className="reference-positions">
                    {publication.references[0].referencePositions.join(", ")}
                  </span>
                </p>
              </div>
              <div className="source-name">
                <p className="source">
                  Source name:{" "}
                  <span>
                    {publication.references[0].source.name}
                  </span>
                  </p> 
                  </div>
                  <div className="links-container">
                  {publication.citation.citationCrossReferences.map((link, index) => (
                    <div key={index} className="containerLink">
                      <a href={link.database + link.id} target="_blank" rel="noopener noreferrer">
                        {link.database}
                      </a>
                      <img src={Icon} alt="Icon" />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
  );
};

export default Publications;
