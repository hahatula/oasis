import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LikeEntity = {
  id: number;
  count: number;
  liked: boolean;
};

type LikesState = {
  entities: LikeEntity[];
};

const initialState: LikesState = {
  entities: [],
};

// Redux Toolkit's createReducer API uses Immer internally automatically.  So, it's already safe to "mutate" state inside of any case reducer function that is passed to createReducer or createSlice
const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    likeToggled(state, action) {
      const likeId = action.payload.id;
      const like = state.entities.find((entity) => entity.id === likeId);
      if (like && like.count) {
        like.liked = !like.liked;
        like.count = like.liked ? like.count + 1 : like.count - 1;
      }
    },
    setInitialLikes(
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) {
      const { id, count } = action.payload;
      const like = state.entities.find((entity) => entity.id === id);
      if (like) {
        like.count = count;
      } else {
        state.entities.push({ id, count, liked: false });
      }
    },
  },
});

export const { likeToggled, setInitialLikes } = likeSlice.actions;
export default likeSlice.reducer;
