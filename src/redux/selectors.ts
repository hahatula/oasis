import { PostData } from '../types/post';
import { User } from '../types/user';
import { ResidentsState } from './residentsSlice';
import { ModalState } from './modalSlice';

export const getModal = (state: { modal: ModalState }) => state.modal;
export const getPosts = (state: { posts: { entities: PostData[] } }) =>
  state.posts.entities;
export const getLikes = (
  state: {
    likes: { entities: { id: string; liked: boolean; count: number }[] };
  },
  id: string
) => state.likes.entities.find((entity) => entity.id === id);
export const getUser = (state: { user: User | null }) => state.user;
export const getResidents = (state: { residentsList: ResidentsState }) =>
  state.residentsList.entities;
