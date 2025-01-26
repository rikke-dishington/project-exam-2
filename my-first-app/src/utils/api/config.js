const API_BASE_URL = 'https://v2.api.noroff.dev';

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
    throw new Error(data.errors?.[0]?.message || 'An error occurred');
  }
  
  return data.data; // The v2 API wraps responses in a data property
};

// Main API client function
export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  // Merge default options with provided options
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    throw error;
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