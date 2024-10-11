import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostData } from '../types/post';
import { posts } from '../utils/tempDB';

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
    updatePost(state, action: PayloadAction<{ _id: string; newText: string }>) {
      const { _id, newText } = action.payload;
      const post = state.entities.find((entity) => entity._id === _id);
      if (post) {
        post.text = newText;
      }
    },
    addPost(state, action: PayloadAction<PostData>) {
      const newPost = action.payload;
      state.entities.unshift(newPost);
    },
  },
});

export const { setInitialPosts, updatePost, addPost } = postsSlice.actions;
export default postsSlice.reducer;
