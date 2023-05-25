import "../pages/SearchResults.css"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"

const SearchResults = ({ query }) => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get("query")
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const searchQuery = query || "*";

        // const response = await axios.get(
        //   `https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${searchQuery}`,
        // )
        const apiUrl = `https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${searchQuery}`;
        const response = await axios.get(apiUrl);
        console.log(response)

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
    <div className="table-container">
      <table>
        <tr>
          <th>{"#"}</th>
          <th>{"Entry"}</th>
          <th>{"Entry names"}</th>
          <th>{"Genes "}</th>
          <th>{"Organism"}</th>
          <th>{"Subcellular Location"}</th>
          <th>{"Length"}</th>
        </tr>
        {/* <tbody> */}
        {results.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.primaryAccession}</td>
            <td>{item.uniProtkbId}</td>
            <td>
              {" "}
              {item.genes ? item.genes[0]?.geneName?.value : "no genes data "}
            </td>
            <td>{item.organism.scientificName}</td>
            <td>
              {item.comments
                ? item.comments[0]?.subcellularLocations[0]?.location.value
                : "no location data"}
            </td>
            <td>{item.sequence.length}</td>
          </tr>
        ))}
        {/* </tbody> */}
      </table>
    </div>
  )
}

export default SearchResults
