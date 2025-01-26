import { apiClient, API_ROUTES } from './config';

export const authApi = {
  register: (userData) => {
    return apiClient(API_ROUTES.auth.register, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    const data = await apiClient(API_ROUTES.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
    }
    
    return data;
  },

  createApiKey: () => {
    return apiClient(API_ROUTES.auth.createApiKey, {
      method: 'POST',
    });
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};