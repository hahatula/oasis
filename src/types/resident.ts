export type ResidentData = {
  _id: string;
  name: string;
  avatar: string;
  species: string;
  bio: string;
  bday: string;
  posts: [];
};

export type newResidentData = {
  name: string;
  avatar: string;
  species: string;
  bio?: string;
  bday?: Date | null;
};
