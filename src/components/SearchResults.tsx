import "../pages/SearchResults.css"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import SortIcon from "../assets/sortIcon.svg";

const SearchResults = ({ query }) => {

  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;
        const response = await axios.get(apiUrl);

        setResults(response.data.results)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [query])

  if (results.length === 0) {
    return (
      <div className="no-result">
        <p className="bottom-text">Please start a search to display results</p>
        <p className="upper-text">No data to display</p>
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
          {/* <tbody> */}
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
          {/* </tbody> */}
        </table>
      </div>
    </div>
  )
}

export default SearchResults
