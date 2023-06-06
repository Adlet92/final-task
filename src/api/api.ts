import axios from "axios";
import { toast } from "react-toastify";

const UNIPROT_API_URL = "https://rest.uniprot.org/uniprotkb/";

export const fetchSearchResults = async (query: string, page: number) => {

  const apiUrl = `${UNIPROT_API_URL}search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}&size=${page}`;
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
