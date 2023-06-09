import axios from "axios";
import { toast } from "react-toastify";

const UNIPROT_API_URL = "https://rest.uniprot.org/uniprotkb/";

export const fetchSearchResults = async (query: string, page: number, filters?: string) => {

  let apiUrl = `${UNIPROT_API_URL}search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;
  if (filters) {
    apiUrl += `${encodeURIComponent(filters)}`;
  }
  if (page) {
    apiUrl += "&size=" + page;
  }
  console.log(apiUrl)
  try {
      const response = await axios.get(apiUrl);
      const data = response.data.results;
      const headers = response.headers['x-total-results'];
      return { data, headers};
    } catch (error) {
      toast.error(error as string);
      return { data: [], headers: {}};
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

export const fetchFilterOptions = async (query: string) => {

  try {
    const response = await fetch(`${UNIPROT_API_URL}search?facets=model_organism,proteins_with,annotation_score&query=(${query})`);
    const optionsData = await response.json();
    const organism = [...optionsData.facets[0].values];
    const protein = [...optionsData.facets[1].values];
    const annotation = [...optionsData.facets[2].values];
    return { organism, protein, annotation };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
