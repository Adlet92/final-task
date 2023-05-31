import axios from "axios";
import { toast } from "react-toastify";

export const fetchSearchResults = async (query: string) => {
  const apiUrl = `https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`;
  
  try {
    const response = await axios.get(apiUrl);
    return response.data.results;
  } catch (error) {
    toast.error(error as string);
    return [];
  }
};

export const fetchProteinDetails = async (proteinId: string) => {
  const apiUrl = `https://rest.uniprot.org/uniprotkb/${proteinId}`;
  try{
    const response = await axios.get(apiUrl);
    return response.data;
  }catch (error){
    toast.error(error as string);
    return [];
  }
};

export const fetchProteinPublications = async (entry: string) => {
  const apiUrl = `https://rest.uniprot.org/uniprotkb/${entry}/publications`;
  try{
    const response = await axios.get(apiUrl);
    return response.data;
  }catch(error){
    toast.error(error as string);
    return [];
  }
};
