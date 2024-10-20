import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalState = {
  modalIsActive: string | null;
  chosenResident: {
    _id: string;
    name: string;
    avatar: string;
    species: string;
  } | null;
};

const initialState: ModalState = {
  modalIsActive: null,
  chosenResident: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string | null>) {
      state.modalIsActive = action.payload;
    },
    closeModal(state) {
      state.modalIsActive = null;
      state.chosenResident = null;
    },
    setChosenResident(
      state,
      action: PayloadAction<ModalState['chosenResident']>
    ) {
      state.chosenResident = action.payload;
    },
  },
});

export const { openModal, closeModal, setChosenResident } = modalSlice.actions;
export default modalSlice.reducer;
