import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import likesSlice from './likesSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  modal: modalSlice,
  likes: likesSlice,
  user: userSlice,
});

export default rootReducer;
