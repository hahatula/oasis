import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import userSlice from './userSlice';
import postSlice from './postSlice';
import residentsSlice from './residentsSlice';

const rootReducer = combineReducers({
  user: userSlice,
  residents: residentsSlice,
  posts: postSlice,
  modal: modalSlice,
});

export default rootReducer;
