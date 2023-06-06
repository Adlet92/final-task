import "./SearchResults.css";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchSearchResults } from "src/api/api";
import { ResultsData, SortKey, SortOrder } from "src/types/resultsData";
import { addSpacesToString } from "src/utils/convert";
import { routes } from "src/utils/routes";
import SortIcon from "../../assets/sortIcon.svg";
import SortIconBlue from "../../assets/sortIconBlue.svg";
import { sortResults } from "../../utils/sorting";


const SearchResults = ({ query }: { query: string }) => {

  const [results, setResults] = useState<ResultsData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(25);

    useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true);
          try {
            const { data: searchParams, headers: totalNum} = await fetchSearchResults(query, page);
            // setResults(searchParams)
            setResults((prevResults) => [...prevResults, ...searchParams]);
            setTotalResults(totalNum)
          } catch (error) {
            toast.error(error as string);
          } finally {
            setIsLoading(false);
          }
      };
        fetchData();
    }, [query, sortOrder, sortKey, page]);


  const loadMoreResults = async () => {
      setPage((prevPage) => prevPage + 25);
  };

    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      const urlSortOrder = params.get("sortOrder") as SortOrder;
      const urlSortKey = params.get("sortKey") as SortKey;
      if (urlSortOrder && urlSortKey) {
        setSortOrder(urlSortOrder);
        setSortKey(urlSortKey);
      }
    }, [searchParams]);


  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prevSortOrder) => {
        if (prevSortOrder === "asc") return "desc";
        if (prevSortOrder === "desc") return "default";
        return "asc";
      });
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      if (sortKey && sortOrder) {
        params.set("sort", `${sortKey} ${sortOrder}`);
      } else {
        params.delete("sort");
      }
      setSearchParams(params.toString());
    }, [sortKey, sortOrder]);

    useEffect(() => {
      const params = new URLSearchParams(searchParams);
      const sortParam = params.get("sort");
      if (sortParam) {
        const [key, order] = sortParam.split(" ");
        setSortKey(key as SortKey);
        setSortOrder(order as SortOrder);
      }
    }, [searchParams]);

  // if (isLoading) {
  //   return <Loading />;
  // }
  // if (isLoading && results.length === 0) {
  //   return <Loading />;
  // }

  if (results.length === 0) {
    return (
      <div className="no-result">
        <p className="bottom-text">Please start your new search to display results</p>
        <p className="upper-text">No data was found</p>
      </div>
    )
  }

  const sortedResults = sortResults(results, sortOrder, sortKey);

  return (
    <div>
      <div className="results-number">
        <p>{`${addSpacesToString(totalResults.toString())} Search results found for "${query}" `}</p>
    </div>
      <div
        className="table-container">
        <InfiniteScroll
            dataLength={sortedResults.length}
            next={loadMoreResults}
            hasMore={results.length < totalResults}
            scrollThreshold={1.0}
            loader={<h4>Loading...</h4>}
            height={500}
        >
        <table className="resultTable">
          <thead>
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
          </thead>
          <tbody>
          {sortedResults.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="primaryAccession"><Link to={`${routes.proteinRoute}/${item.primaryAccession}`}>
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
          </tbody>
          </table>
          </InfiniteScroll>
      </div>
    </div>
  )
}

export default SearchResults
