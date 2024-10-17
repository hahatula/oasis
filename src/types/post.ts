import { User } from './user'

export type PostData = {
  _id: string;
  text: string;
  photoUrl: string;
  authors: {
    host: {
      _id: string;
      name: string;
      avatar: string;
    };
    resident: {
      _id: string;
      name: string;
      avatar: string;
      species: string;
    };
  };
  likes: User[];
  createdAt: string;
  //TODO: use type Date?
};

export type PostProps = PostData & {
  handlePostClick: (data: PostData) => void;
};

export type newPostData = {
  text: string;
  photoUrl: string;
  residentId: string;
};

export type updatedPostData = {
  id: string;
  text: string;
};
