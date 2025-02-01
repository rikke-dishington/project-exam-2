import { apiClient, API_ROUTES } from '../../../api/config';

export const authApi = {
  register: (userData) => {
    return apiClient(API_ROUTES.auth.register, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    const response = await apiClient(API_ROUTES.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('userName', response.data.name);
    } else {
      throw new Error('No access token received');
    }
    
    return response.data;
  },

  createApiKey: async () => {
    const response = await apiClient(API_ROUTES.auth.createApiKey, {
      method: 'POST',
      body: JSON.stringify({
        name: "Holidaze API Key"
      })
    });
    return response.data.key;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};