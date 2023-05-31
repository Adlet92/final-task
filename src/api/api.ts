import axios from "axios";

export const fetchSearchResults = async (query: string) => {
  const apiUrl = `https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchProteinDetails = async (proteinId: string) => {
  const apiUrl = `https://rest.uniprot.org/uniprotkb/${proteinId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

export const fetchProteinPublications = async (entry: string) => {
  const apiUrl = `https://rest.uniprot.org/uniprotkb/${entry}/publications`;
  const response = await axios.get(apiUrl);
  return response.data;
};
