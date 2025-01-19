export const API_BASE_URL = 'https://api.noroff.dev/api/v1';

export const API_URLS = {
  venues: `${API_BASE_URL}/holidaze/venues`,
  bookings: `${API_BASE_URL}/holidaze/bookings`,
  profiles: `${API_BASE_URL}/holidaze/profiles`,
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    createApiKey: `${API_BASE_URL}/auth/create-api-key`,
  },
};

export const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred'
    }));
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function fetchWithError(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new ApiError(data.message || 'An error occurred', response.status);
    }
    
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message, 500);
  }
}