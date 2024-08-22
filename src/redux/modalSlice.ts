import { OPEN_MODAL, CLOSE_MODAL } from './action-types';

type Action = {
    type: string;
    payload?: string;
  };

  export const modalReducer = (state: string | null = null, action: Action) => {
    switch (action.type) {
      case OPEN_MODAL:
        return (state = action.payload || null);
      case CLOSE_MODAL:
        return (state = null);
      default:
        return state;
    }
  };