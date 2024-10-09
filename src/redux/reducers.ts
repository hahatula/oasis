import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import likesSlice from './likesSlice';
import userSlice from './userSlice';
import postSlice from './postSlice';
import residentsSlice from './residentsSlice';

const rootReducer = combineReducers({
  user: userSlice,
  residents: residentsSlice,
  posts: postSlice,
  likes: likesSlice,
  modal: modalSlice,
});

export default rootReducer;
