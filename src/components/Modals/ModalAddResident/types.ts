export type AddResidentFormProps = {
  formName: string;
  onClose: () => void;
};

export type PlantTipResponse = {
  results: Array<{
    species?: {
      commonNames: string[];
    };
  }>;
};

export type UserInput = {
  species: string;
  name: string;
  bday: Date | null;
  bio: string;
};
