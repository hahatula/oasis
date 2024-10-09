export type PostData = {
  id: number;
  text: string;
  photoUrl: string;
  authors: {
    host: {
      id: string;
      name: string;
      avatarUrl: string;
    };
    resident: {
      id: number;
      name: string;
      avatarUrl: string;
      species: string;
    };
  };
  likes: number;
  createdAt: string;
  //TODO: use type Date?
};

export type PostProps = PostData & {
  handlePostClick: (data: PostData) => void;
};

export type ModalPostProps = PostData & {
  onClose: () => void;
};
