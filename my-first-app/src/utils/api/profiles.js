import { API_URLS, fetchWithError, getHeaders } from './config';

export const getProfile = async (name) => {
  return fetchWithError(`${API_URLS.profiles}/${name}`);
};

export const updateProfile = async (name, profileData) => {
  return fetchWithError(`${API_URLS.profiles}/${name}`, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};

export const getProfileVenues = async (name) => {
  return fetchWithError(`${API_URLS.profiles}/${name}/venues`);
}; 