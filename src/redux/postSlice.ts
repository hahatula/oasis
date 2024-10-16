import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostData } from '../types/post';
import { User } from '../types/user';

type PostsState = {
  entities: PostData[];
};

const initialState: PostsState = {
  entities: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setInitialPosts(state, action: PayloadAction<PostData[]>) {
      state.entities = action.payload;
    },
    editPost(state, action: PayloadAction<{ _id: string; text: string }>) {
      const { _id, text } = action.payload;
      const post = state.entities.find((entity) => entity._id === _id);
      if (post) {
        post.text = text;
      }
    },
    addPost(state, action: PayloadAction<PostData>) {
      const newPost = action.payload;
      state.entities.push(newPost);
    },
    addLike(state, action: PayloadAction<{ _id: string; user: User }>) {
      const { _id, user } = action.payload;
      const post = state.entities.find((entity) => entity._id === _id);
      if (post && !post.likes.some((like) => like._id === user._id)) {
        post.likes.push(user);
      }
    },
    removeLike(state, action: PayloadAction<{ _id: string; user: User }>) {
      const { _id, user } = action.payload;
      const post = state.entities.find((entity) => entity._id === _id);
      if (post) {
        post.likes = post.likes.filter((like) => like._id !== user._id);
      }
    },
  },
});

export const { setInitialPosts, editPost, addPost, addLike, removeLike } = postsSlice.actions;
export default postsSlice.reducer;
