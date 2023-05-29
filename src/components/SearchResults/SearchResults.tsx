import "./SearchResults.css"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import SortIcon from "../../assets/sortIcon.svg";
import Loading from "src/components/Loading/Loading";
import { fetchSearchResults } from "src/api/api";


interface SubcellularLocation {
  location: { value: string };
}

interface Organism {
  scientificName: string;
}

interface Comment {
  subcellularLocations: SubcellularLocation[];
}

interface Gene {
  geneName: { value: string };
  synonyms: { value: string }[];
}

interface ResultsData {
  primaryAccession: string;
  uniProtkbId: string;
  genes: Gene[];
  organism: Organism;
  comments: Comment[];
  sequence: string;
}

const SearchResults = ({ query }: { query: string }) => {

  const [results, setResults] = useState<ResultsData[]>([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const searchResults = await fetchSearchResults(query);
        setResults(searchResults);
        
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false); 
      }
    }

    fetchData()
  }, [query])


  if (isLoading) {
    return <Loading />; 
  }

  if (results.length === 0) {
    return (
      <div className="no-result">
        <p className="bottom-text">Please start your new search to display results</p>
        <p className="upper-text">No data was found</p>
      </div>
    )
  }

  return (
    <div>
      <div className="results-number">
        <p>{`${results.length} Search results found for "${query}" `}</p>
    </div>
      <div className="table-container">
        <table>
          <tr>
            <th className="number">{"#"}</th>
            <th className="entry">
              {"Entry"}<img src={SortIcon}/>
              </th>
            <th className="entry-name">
              {"Entry names"}<img src={SortIcon}/>
              </th>
            <th className="genes">
              {"Genes "}<img src={SortIcon}/>
              </th>
            <th className="organism">
              {"Organism"}<img src={SortIcon}/>
              </th>
            <th className="location">
              {"Subcellular Location"}
              </th>
            <th className="length">
              {"Length"}<img src={SortIcon}/>
              </th>
          </tr>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="primaryAccession"><Link to={`/protein/${item.primaryAccession}`}>
                    {item.primaryAccession}
                  </Link>
              </td>
              <td className="uniProtkbId">{item.uniProtkbId}</td>
              <td className="genes-column">
                  {item.genes ? (
                    item.genes.map((gene, num) => (
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
                </td>

              <td className="scientificName">{item.organism.scientificName}</td>
              <td className="subcellularLocations">
                {item.comments
                  ? item.comments[0]?.subcellularLocations[0]?.location.value
                  : "no location data"}
              </td>
              <td className="lengthLast">{item.sequence.length}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default SearchResults
