import React, { useEffect, useRef, useState }  from "react"
import copyIcon from "../../../assets/copyIcon.svg";
import copyIconBlue from "../../../assets/copyIconBlue.svg";
import './DetailsPage.css'
import Loading from "src/components/Loading/Loading";
import { ProteinPageProps } from "src/types/types";

interface DetailsPageProps {
    proteinData: ProteinPageProps;
  }

const DetailsPage: React.FC<DetailsPageProps> = ({ proteinData }) => {
    const sequenceRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCopyClicked, setIsCopyClicked] = useState<boolean>(false);


    useEffect(() => {
        const timer = setTimeout(() => {
        setIsLoading(false);
        }, 2000);

        return () => {
        clearTimeout(timer);
        };
    }, []);

    const handleCopyClick = () => {
        if (sequenceRef.current) {
            const sequenceInfo = sequenceRef.current.innerText;
            navigator.clipboard.writeText(sequenceInfo);
            setIsCopyClicked(true);
            setTimeout(() => {
                setIsCopyClicked(false);
            }, 1000);
        }
    };
    const formatDate = (dateString: string) => {
        const dateParts = dateString.split("-");
        const year = dateParts[0];
        const month = new Date(dateString + "T00:00:00").toLocaleString("en-US", { month: "long" });
        const day = dateParts[2].split("T")[0];
        return `${month} ${day} ${year}`;
      };
      
    if (isLoading) {
        return <Loading />;
    }
   
    return (
        <>
        <div className="details-container">
            <div className="title">
                <p>Sequence</p>
            </div>
          <div className="desciption-container">
                <div className="desciption-left">
                    <div className="label">
                        Length
                    </div>
                    <div className="protein-info">
                        {proteinData.sequence.length}
                    </div>
                    <div className="label">
                        Mass(Da)
                    </div>
                    <div className="protein-info">
                        {proteinData.sequence.molWeight}
                    </div>
                </div>
                <div className="desciption-right">
                    <div className="label">
                        Last Updated
                    </div>
                    <div className="protein-info">
                        {formatDate(proteinData.entryAudit.lastSequenceUpdateDate)}
                    </div>
                    <div className="label">
                        Checksum
                    </div>
                    <div className="protein-info">
                        {proteinData.sequence.crc64}
                    </div>
                </div>
          </div>
          <div className="copy-icon" onClick={handleCopyClick}>
            <img src={isCopyClicked ? copyIconBlue : copyIcon} alt="copy Icon" />
            <p>Copy</p>
          </div>
          <div className="sequence-container">
                <div className="sequence-info" ref={sequenceRef}>
                    {proteinData.sequence.value}
                </div>
          </div>
        </div>
      </>
    )
}

export default DetailsPage
