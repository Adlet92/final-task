import axios from "axios";
import { toast } from "react-toastify";

const UNIPROT_API_URL = "https://rest.uniprot.org/uniprotkb/";

export const fetchSearchResults = async (query: string) => {

  const apiUrl = `${UNIPROT_API_URL}search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;

  try {
    const response = await axios.get(apiUrl);
    // const headers = response.headers['x-total-results'];
    const data = response.data.results;
    // return { data, headers }
    return data;
  } catch (error) {
    toast.error(error as string);
    return [];
  }
};
export const fetchSearchHeaders = async (query: string) => {
  const apiUrl = `${UNIPROT_API_URL}search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const headers = response.headers;
    console.log(headers)
    return headers;
  } catch (error) {
    toast.error(error as string);
    return {};
  }
};


export const fetchProteinDetails = async (proteinId: string) => {
  const apiUrl = `${UNIPROT_API_URL}${proteinId}`;
  try{
    const response = await axios.get(apiUrl);
    return response.data;
  }catch (error){
    toast.error(error as string);
    return [];
  }
};

export const fetchProteinPublications = async (entry: string) => {
  const apiUrl = `${UNIPROT_API_URL}${entry}/publications`;
  try{
    const response = await axios.get(apiUrl);
    return response.data;
  }catch(error){
    toast.error(error as string);
    return [];
  }
};
