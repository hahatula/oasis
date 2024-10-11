import { BASE_URL } from './constants';
import { User } from '../types/user';
import { ResidentData, newResidentData } from '../types/resident';
import { newPostData, PostData } from '../types/post';

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
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Specify an authorization header with an appropriately formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = (
  token: string,
  name: string,
  bio: string
): Promise<User> => {
  return request(`${BASE_URL}/users/me/profile`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, bio }),
  });
};

export const updateAvatar = (token: string, avatar: string): Promise<User> => {
  return request(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ avatar }),
  });
};

// TODO: maybe use later to view other hosts profiles
// export const getHostInfo = (token: string, hostId: string): Promise<User> => {
//   return request(`${BASE_URL}/users/${hostId}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       // Specify an authorization header with an appropriately formatted value.
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const createResident = (
  token: string,
  { name, avatar, species, bio, bday }: newResidentData
): Promise<ResidentData> => {
  return request(`${BASE_URL}/residents`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar, species, bio, bday }),
  });
};

export const getResidents = (
  token: string,
  residentIds: string[]
): Promise<ResidentData[]> => {
  // Convert the array of IDs into a query string
  const queryString = residentIds.map((id) => `id=${id}`).join('&');

  return request(`${BASE_URL}/residents?${queryString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Specify an authorization header with an appropriately formatted value.
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPost = (
  token: string,
  { text, photoUrl, residentId }: newPostData
): Promise<PostData> => {
  return request(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text, photoUrl, residentId }),
  });
};
