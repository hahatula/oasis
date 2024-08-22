import { combineReducers } from '@reduxjs/toolkit';
import { modalReducer } from './modalSlice';
import likesSlice from './likesSlice';

const rootReducer = combineReducers({
  modal: modalReducer,
  likes: likesSlice,
});

export default rootReducer;
