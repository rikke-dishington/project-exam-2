import { apiClient, API_ROUTES } from './config';

export const bookingApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`${API_ROUTES.bookings.base}?${queryString}`);
  },

  getById: (id) => {
    return apiClient(API_ROUTES.bookings.byId(id));
  },

  create: (data) => {
    return apiClient(API_ROUTES.bookings.base, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id, data) => {
    return apiClient(API_ROUTES.bookings.byId(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id) => {
    return apiClient(API_ROUTES.bookings.byId(id), {
      method: 'DELETE',
    });
  },

  getVenueBookings: (venueId) => {
    return apiClient(`${API_ROUTES.bookings.base}?venue=${venueId}`);
  },
}; 