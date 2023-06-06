import { ResultsData, SortKey, SortOrder } from "src/types/resultsData";

export const sortResults = (results: ResultsData[], sortOrder: SortOrder, sortKey: SortKey | null): ResultsData[] => {
  const sortedResults = [...results];

  sortedResults.sort((a, b) => {
    if (sortOrder === "default") {
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

const getValue = (data: ResultsData, key: SortKey | null): string | number => {
  if (key === null) {
    return "";
  }

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
