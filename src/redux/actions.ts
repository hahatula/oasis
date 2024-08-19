import { OPEN_MODAL, CLOSE_MODAL } from './action-types';

export const openModal = (modalType: string) => ({
  type: OPEN_MODAL,
  payload: modalType,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
