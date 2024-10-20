// TODO: will be used in future to view other user's residents
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResidentData } from '../types/resident';

export type ResidentsState = {
  selectedUserId: string | null;
  entities: ResidentData[];
};

const initialState: ResidentsState = {
  selectedUserId: null,
  entities: [],
};

const residentsSlice = createSlice({
  name: 'residentsList',
  initialState,
  reducers: {
    setResidents(
      state,
      action: PayloadAction<{ userId: string; residents: ResidentData[] }>
    ) {
      state.selectedUserId = action.payload.userId;
      state.entities = action.payload.residents;
    },
    clearResidents(state) {
      state.selectedUserId = null;
      state.entities = [];
    },
  },
});

export const { setResidents, clearResidents } = residentsSlice.actions;
export default residentsSlice.reducer;
