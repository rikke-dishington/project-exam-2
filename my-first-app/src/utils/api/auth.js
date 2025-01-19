import { API_URLS, getHeaders, ApiError } from './config';

export const register = async (userData) => {
  // Validation checks
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error('Name, email and password are required');
  }

  // Ensure email ends with @stud.noroff.no or @noroff.no
  if (!userData.email.endsWith('@stud.noroff.no') && !userData.email.endsWith('@noroff.no')) {
    throw new Error('Email must be a valid Noroff email address (@stud.noroff.no or @noroff.no)');
  }

  // Ensure password is at least 8 characters
  if (userData.password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // Ensure name meets the requirements (no spaces, special characters allowed)
  if (!/^[a-zA-Z0-9_]+$/.test(userData.name)) {
    throw new Error('Name can only contain letters, numbers and underscore');
  }

  // Format the request body according to API documentation
  const registerData = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    bio: userData.bio || null,
    avatar: userData.avatar ? {
      url: userData.avatar,
      alt: userData.avatarAlt || 'Profile avatar'
    } : null,
    banner: userData.banner ? {
      url: userData.banner,
      alt: userData.bannerAlt || 'Profile banner'
    } : null,
    venueManager: Boolean(userData.venueManager)
  };

  try {
    console.log('Sending registration data:', registerData);

    const response = await fetch(API_URLS.auth.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (!response.ok) {
      console.error('Registration failed:', data);
      throw new Error(
        data.errors?.[0]?.message || 
        data.message || 
        `Registration failed with status ${response.status}`
      );
    }
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
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
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    
    // Store the access token
    localStorage.setItem('token', data.accessToken);
    return data;
  } catch (error) {
    throw new Error(error.message);
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

export const getToken = () => {
  return localStorage.getItem('token');
};