const API_BASE_URL = 'https://v2.api.noroff.dev';

// Function to get stored API key
const getStoredApiKey = () => localStorage.getItem('noroff_api_key');

// Function to store API key
const storeApiKey = (key) => localStorage.setItem('noroff_api_key', key);

// Common headers and options for all requests
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    console.error('API Error Response:', data); // Debug log
    throw new Error(data.errors?.[0]?.message || 'An error occurred');
  }
  
  return data;
};

// Main API client function
export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  const apiKey = getStoredApiKey();

  console.log('Token:', token);
  console.log('Endpoint:', endpoint);
  console.log('API Key:', apiKey);

  // Create headers
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (apiKey) {
    headers.append('X-Noroff-API-Key', apiKey);
  }

  if (token && !endpoint.includes('/auth/login')) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const requestOptions = {
    ...options,
    headers,
  };

  console.log('Request headers:', Object.fromEntries(headers.entries()));

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(data.errors?.[0]?.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error:`, error);
    throw error;
  }
};

// Function to initialize API key
export const initializeApiKey = async (retries = 3) => {
  const existingKey = getStoredApiKey();
  if (existingKey) {
    return existingKey;
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await apiClient(API_ROUTES.auth.createApiKey, {
        method: 'POST',
        body: JSON.stringify({
          name: "Holidaze API Key"
        })
      });

      if (response.data?.key) {
        storeApiKey(response.data.key);
        return response.data.key;
      }
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

// API Routes
export const API_ROUTES = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    createApiKey: '/auth/create-api-key',
  },
  venues: {
    base: '/holidaze/venues',
    search: '/holidaze/venues/search',
    byId: (id) => `/holidaze/venues/${id}`,
  },
  profiles: {
    base: '/holidaze/profiles',
    byName: (name) => `/holidaze/profiles/${name}`,
    bookings: (name) => `/holidaze/profiles/${name}/bookings`,
    venues: (name) => `/holidaze/profiles/${name}/venues`,
  },
  bookings: {
    base: '/holidaze/bookings',
    byId: (id) => `/holidaze/bookings/${id}`,
  },
};

export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
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