import { API_URLS, getHeaders, ApiError } from './config';

export const register = async (userData) => {
  try {
    const response = await fetch(API_URLS.auth.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new ApiError(data.message, response.status);
    
    return data;
  } catch (error) {
    throw new ApiError(error.message, error.status);
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(API_URLS.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new ApiError(data.message, response.status);
    
    if (data.accessToken) {
      localStorage.setItem('token', data.accessToken);
    }
    
    return data;
  } catch (error) {
    throw new ApiError(error.message, error.status);
  }
};

export const createApiKey = async () => {
  try {
    const response = await fetch(API_URLS.auth.createApiKey, {
      method: 'POST',
      headers: getHeaders(),
    });
    
    const data = await response.json();
    
    if (!response.ok) throw new ApiError(data.message, response.status);
    
    return data;
  } catch (error) {
    throw new ApiError(error.message, error.status);
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};