import { BASE_URL } from './constants';
import { request } from './api';

export const register = (name: string, email: string, password: string, avatar?: string, bio?: string): Promise<TokenResponse> => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, avatar, bio }),
  });
};

export const authorize = (email: string, password: string): Promise<TokenResponse> => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};

type TokenResponse = {
  token: string;
};
