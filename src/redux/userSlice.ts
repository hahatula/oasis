import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type currentUser = {
//   id: string;
// };

const userSlice = createSlice({
  name: 'user',
  initialState: null as string | null,
  reducers: {
    setUser(_, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
