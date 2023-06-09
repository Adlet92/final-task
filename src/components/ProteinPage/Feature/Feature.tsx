import ProtvistaUniprot from "protvista-uniprot";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "src/components/Loading/Loading";
import "./Feature.css";
window.customElements.define("protvista-uniprot", ProtvistaUniprot);


const Feature = () => {
  const { proteinId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className="protvista-container">
          <protvista-uniprot accession={proteinId} />
        </div>
      )}
    </>
  );
};

export default Feature;
