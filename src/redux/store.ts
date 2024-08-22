import { configureStore } from '@reduxjs/toolkit';
import { oasisMiddleware } from './middleware';
//import { modalReducer } from './reducers';
import rootReducer from './reducers';

export const store = configureStore({
  // All the logic related to configuring the store (including importing reducers, middleware, and enhancers) is handled in configureStore
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(oasisMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;