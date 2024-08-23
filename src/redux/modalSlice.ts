import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = string | null;

const modalSlice = createSlice({
  name: 'modal',
  initialState: null as ModalState,
  reducers: {
    //the state parameter is replaced with _, which is commonly used in TypeScript and JavaScript to indicate an unused parameter (for linter).
    openModal(_, action: PayloadAction<string | null>) {
      return action.payload;
    },
    closeModal() {
      return null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
