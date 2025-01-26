import { apiClient, API_ROUTES } from './config';

export const profileApi = {
  getProfile: (name) => {
    return apiClient(API_ROUTES.profiles.byName(name));
  },

  updateProfile: (name, data) => {
    return apiClient(API_ROUTES.profiles.byName(name), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getProfileVenues: (name) => {
    return apiClient(API_ROUTES.profiles.venues(name));
  },

  getProfileBookings: (name) => {
    return apiClient(API_ROUTES.profiles.bookings(name));
  },
};