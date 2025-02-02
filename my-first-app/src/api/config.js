const API_BASE_URL = 'https://v2.api.noroff.dev';

const getStoredApiKey = () => localStorage.getItem('noroff_api_key');
const getStoredToken = () => localStorage.getItem('token');

const storeApiKey = (key) => localStorage.setItem('noroff_api_key', key);

// Define public endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  '/holidaze/venues',
  '/holidaze/venues/search',
];

const isPublicEndpoint = (endpoint) => {
  return PUBLIC_ENDPOINTS.some(publicPath => endpoint.startsWith(publicPath)) ||
         endpoint.includes('/auth/login') ||
         endpoint.includes('/auth/register');
};

const createApiKey = async (token) => {
  try {
    const url = `${API_BASE_URL}/auth/create-api-key`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: "Holidaze API Key"
      })
    });

    const data = await response.json();
    
    // Log the response for debugging
    console.log('API Key Response:', data);

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Failed to create API key');
    }

    // The API returns the key in the 'data' property
    if (data?.data?.key) {
      storeApiKey(data.data.key);
      return data.data.key;
    }
    throw new Error('No key in response: ' + JSON.stringify(data));
  } catch (error) {
    console.error('Error creating API key:', error);
    throw error;
  }
};

export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getStoredToken();
  const apiKey = getStoredApiKey();

  // For non-public endpoints, require both token and API key
  if (!isPublicEndpoint(endpoint)) {
    if (!token) {
      throw new Error('No authorization token found');
    }
    if (!apiKey && !endpoint.includes('/auth/create-api-key')) {
      throw new Error('No API key found');
    }
  }

  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  // Always include API key if available
  if (apiKey) {
    headers.append('X-Noroff-API-Key', apiKey);
  }

  // Include token for authenticated requests
  if (token && !endpoint.includes('/auth/login')) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const requestOptions = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  };

  try {
    const response = await fetch(url, requestOptions);
    
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(data.errors?.[0]?.message || 'An error occurred');
    }
    
    return data;
  } catch (error) {
    if (error.name === 'SyntaxError') {
      return null;
    }
    console.error(`API Error:`, error);
    throw error;
  }
};

export const initializeApiKey = async (retries = 3) => {
  const existingKey = getStoredApiKey();
  if (existingKey) {
    return existingKey;
  }

  const token = getStoredToken();
  if (!token) {
    console.error('Cannot initialize API key: No token found');
    return null;
  }

  for (let i = 0; i < retries; i++) {
    try {
      const key = await createApiKey(token);
      if (key) {
        console.log('Successfully created API key');
        return key;
      }
    } catch (error) {
      console.error(`API key initialization attempt ${i + 1} failed:`, error);
      if (i === retries - 1) {
        console.error('Failed to create API key after all retries');
        return null;
      }
      // Wait longer between each retry
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
  return null;
};

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
    bookings: (id) => `/holidaze/venues/${id}/bookings`
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
    withVenue: (id) => `/holidaze/bookings/${id}?_venue=true`,
  },
};