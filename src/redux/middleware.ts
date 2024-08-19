import { Middleware } from "@reduxjs/toolkit";

export const oasisMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('oasisMiddleware trigged');
  return next(action);
};
