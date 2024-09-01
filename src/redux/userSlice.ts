import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type currentUser = {
  id: number;
};

const userSlice = createSlice({
  name: 'user',
  initialState: 1,
  reducers: {
    setUser(_, action: PayloadAction<currentUser>) {
      return action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
