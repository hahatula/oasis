import { combineReducers } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import likesSlice from './likesSlice';
import userSlice from './userSlice';
import postSlice from './postSlice';

const rootReducer = combineReducers({
  user: userSlice,
  posts: postSlice,
  likes: likesSlice,
  modal: modalSlice,
});

export default rootReducer;
