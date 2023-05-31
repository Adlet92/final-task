export interface ProteinPageProps {
    uniProtkbId: string;
    organism: { scientificName: string };
    proteinDescription: { recommendedName: { fullName: { value: string } } };
    genes: [{ geneName: { value: string }; synonyms?: [{ value: string }] }];
    sequence: {
      length: number;
      molWeight: number;
      value: string;
      crc64: string;
    };
    entryAudit: {
      lastSequenceUpdateDate: string;
    };
  }
  