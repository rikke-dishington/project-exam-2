import { apiClient, API_ROUTES } from './config';

export const venueApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiClient(`${API_ROUTES.venues.base}?${queryString}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient(API_ROUTES.venues.byId(id));
    return response.data;
  },

  search: async (query) => {
    const response = await apiClient(`${API_ROUTES.venues.search}?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient(API_ROUTES.venues.base, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient(API_ROUTES.venues.byId(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient(API_ROUTES.venues.byId(id), {
      method: 'DELETE',
    });
    return response.data;
  },
};