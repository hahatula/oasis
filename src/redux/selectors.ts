export const getModal = (state: { modal: string | null }) => state.modal;
export const getLikes = (
  state: {
    likes: { entities: { id: number; liked: boolean; count: number }[] };
  },
  id: number
) => state.likes.entities.find((entity) => entity.id === id);
export const getUser = (state: {user: number}) => state.user;