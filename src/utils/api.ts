//import { BASE_URL } from './constants';

export const checkResponse = (res: Response): Promise<any> => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };
  
  export const request = (url: string, options?: RequestInit): Promise<any> => {
    return fetch(url, options).then(checkResponse);
  };
