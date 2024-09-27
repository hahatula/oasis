import { BASE_URL } from './constants';
import { User } from '../types/user';

export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then((res) => checkResponse<T>(res));
};

export const getUserInfo = (token: string): Promise<User> => {
  // Send a GET request to /users/me
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
};
