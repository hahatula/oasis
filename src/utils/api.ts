//import { BASE_URL } from './constants';

export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then((res) => checkResponse<T>(res));
};
