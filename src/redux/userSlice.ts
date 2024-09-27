import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
