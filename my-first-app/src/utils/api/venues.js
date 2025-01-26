import { apiClient, API_ROUTES } from './config';

export const venueApi = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`${API_ROUTES.venues.base}?${queryString}`);
  },

  getById: (id) => {
    return apiClient(API_ROUTES.venues.byId(id));
  },

  search: (query) => {
    return apiClient(`${API_ROUTES.venues.search}?q=${encodeURIComponent(query)}`);
  },

  create: (data) => {
    return apiClient(API_ROUTES.venues.base, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: (id, data) => {
    return apiClient(API_ROUTES.venues.byId(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: (id) => {
    return apiClient(API_ROUTES.venues.byId(id), {
      method: 'DELETE',
    });
  },
};