import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import likesSlice from './likesSlice';

const rootReducer = combineReducers({
  modal: modalSlice,
  likes: likesSlice,
});

export default rootReducer;
