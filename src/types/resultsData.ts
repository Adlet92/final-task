export interface SubcellularLocation {
  location: { value: string };
}

export interface Organism {
  scientificName: string;
}

export interface Comment {
  subcellularLocations: SubcellularLocation[];
}

export interface Gene {
  geneName: { value: string };
  synonyms: { value: string }[];
}

export interface ResultsData {
  primaryAccession: string;
  uniProtkbId: string;
  genes: Gene[];
  organism: Organism;
  comments: Comment[];
  sequence: string;
}

export type SortOrder = "asc" | "desc" | "default";
export type SortKey = "accession" | "id" | "gene" | "organism_name" | "length";
