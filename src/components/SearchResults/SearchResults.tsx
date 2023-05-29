import "./SearchResults.css"

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SortIcon from "../../assets/sortIcon.svg";
import SortIconBlue from "../../assets/sortIconBlue.svg";
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

type SortOrder = "asc" | "desc" | "default";
type SortKey = "accession" | "id" | "gene" | "organism_name" | "length";

const SearchResults = ({ query }: { query: string }) => {

  const [results, setResults] = useState<ResultsData[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

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

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prevSortOrder) => {
        if (prevSortOrder === "asc") return "desc";
        if (prevSortOrder === "desc") return "default";
        return "asc";
      });
    } else {
      // If a different key is clicked, set it as the new sort key and reset the sort order
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortResults = (results: ResultsData[]) => {
    const sortedResults = [...results];
  
    // Apply sorting based on the sort key and order
    sortedResults.sort((a, b) => {
      if (sortOrder === "default") {
        // Sort by index when sortOrder is "default"
        return results.indexOf(a) - results.indexOf(b);
      }
  
      const aValue = getValue(a, sortKey);
      const bValue = getValue(b, sortKey);
  
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  
    return sortedResults;
  };
  

  const getValue = (data: ResultsData, key: SortKey): string | number => {
    switch (key) {
      case "accession":
        return data.primaryAccession;
      case "id":
        return data.uniProtkbId;
      case "gene":
        return data.genes[0]?.geneName?.value ?? "";
      case "organism_name":
        return data.organism.scientificName;
      case "length":
        return data.sequence.length;
      default:
        return "";
    }
  };

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

const sortedResults = sortResults(results);
  return (
    <div>
      <div className="results-number">
        <p>{`${sortedResults.length} Search results found for "${query}" `}</p>
    </div>
      <div className="table-container">
        <table>
          <tr>
            <th className="number">{"#"}</th>
            <th className="entry">
                Entry
              <img 
                  src={sortKey === "accession" ? SortIconBlue : SortIcon}
                  onClick={() => handleSort("accession")}
                  className={sortKey === "accession" ? "active" : ""}/>
              </th>
            <th className="entry-name">
                Entry names
              <img 
                  src={sortKey === "id" ? SortIconBlue : SortIcon}
                  onClick={() => handleSort("id")}
                  className={sortKey === "id" ? "active" : ""}/>
              </th>
            <th className="genes">
                Genes
              <img 
                  src={sortKey === "gene" ? SortIconBlue : SortIcon}
                  onClick={() => handleSort("gene")}
                  className={sortKey === "gene" ? "active" : ""}/>
              </th>
            <th className="organism">
                Organism
              <img 
                  src={sortKey === "organism_name" ? SortIconBlue : SortIcon}
                  onClick={() => handleSort("organism_name")}
                  className={sortKey === "organism_name" ? "active" : ""}/>
              </th>
            <th className="location">
                Subcellular Location
              </th>
            <th className="length">
                Length
              <img 
                  src={sortKey === "length" ? SortIconBlue : SortIcon} 
                  onClick={() => handleSort("length")}
                  className={sortKey === "length" ? "active" : ""}
                  />
              </th>
          </tr>
          {sortedResults.map((item, index) => (
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
