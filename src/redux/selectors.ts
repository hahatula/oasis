import { PostData } from '../types/post';
import { User } from '../types/user';
import { ResidentData } from '../types/resident';

export const getModal = (state: { modal: string | null }) => state.modal;
export const getPosts = (state: { posts: { entities: PostData[] } }) =>
  state.posts.entities;
export const getLikes = (
  state: {
    likes: { entities: { id: string; liked: boolean; count: number }[] };
  },
  id: string
) => state.likes.entities.find((entity) => entity.id === id);
export const getUser = (state: { user: User | null }) => state.user;
export const getResidentsList = (state: {
  residents: { entities: ResidentData[] } | undefined;
}) => state.residents?.entities || [];
