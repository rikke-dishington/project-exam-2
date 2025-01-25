const BASE_URL = 'https://api.noroff.dev/api/v1';
const HOLIDAZE_URL = `${BASE_URL}/holidaze`;

// Helper for consistent headers
const getHeaders = (requiresAuth = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Authentication API calls
 */
export const authEndpoints = {
  async register(userData) {
    const response = await fetch(`${HOLIDAZE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async login(credentials) {
    const response = await fetch(`${HOLIDAZE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    
    localStorage.setItem('token', data.accessToken);
    return data;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

/**
 * Venues API calls
 */
export const venueEndpoints = {
  async getVenues() {
    const response = await fetch(`${HOLIDAZE_URL}/venues`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch venues');
    return data;
  },

  async getVenueById(id) {
    const response = await fetch(`${HOLIDAZE_URL}/venues/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch venue');
    return data;
  },

  async createVenue(venueData) {
    const response = await fetch(`${HOLIDAZE_URL}/venues`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(venueData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create venue');
    return data;
  },

  async updateVenue(id, venueData) {
    const response = await fetch(`${HOLIDAZE_URL}/venues/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(venueData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update venue');
    return data;
  },

  async deleteVenue(id) {
    const response = await fetch(`${HOLIDAZE_URL}/venues/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete venue');
    }
  }
};

/**
 * Bookings API calls
 */
export const bookingEndpoints = {
  async createBooking(bookingData) {
    const response = await fetch(`${HOLIDAZE_URL}/bookings`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(bookingData)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create booking');
    return data;
  },

  async getMyBookings() {
    // Get the current user's name from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.name) {
      throw new Error('User not found');
    }

    // Fetch bookings for the specific user
    const response = await fetch(`${HOLIDAZE_URL}/profiles/${user.name}/bookings`, {
      headers: getHeaders(true)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch bookings');
    return data;
  }
};

/**
 * Profile API calls
 */
export const profileEndpoints = {
  async getProfile(name) {
    const response = await fetch(`${HOLIDAZE_URL}/profiles/${name}`, {
      headers: getHeaders(true)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
    return data;
  },

  async updateProfile(name, profileData) {
    const response = await fetch(`${HOLIDAZE_URL}/profiles/${name}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({
        ...profileData,
        // Ensure avatar and banner are properly formatted
        avatar: profileData.avatar ? {
          url: profileData.avatar.url,
          alt: profileData.avatar.alt
        } : undefined,
        banner: profileData.banner ? {
          url: profileData.banner.url,
          alt: profileData.banner.alt
        } : undefined
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
      console.error('Profile update error:', data);
      throw new Error(data.message || 'Failed to update profile');
    }
    return data;
  },

  async getProfileVenues(name) {
    const response = await fetch(`${HOLIDAZE_URL}/profiles/${name}/venues`, {
      headers: getHeaders(true)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile venues');
    console.log('Profile venues response:', data);
    return data;
  },

  async getProfileBookings(name) {
    const response = await fetch(`${HOLIDAZE_URL}/profiles/${name}/bookings`, {
      headers: getHeaders(true)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch profile bookings');
    return data;
  },

  async updateAvatar(name, avatarUrl) {
    const response = await fetch(`${HOLIDAZE_URL}/profiles/${name}/media`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ avatar: avatarUrl })
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update avatar');
    return data;
  }
};

// Export everything
export {
  BASE_URL,
  HOLIDAZE_URL,
  getHeaders
};

// Export everything from the old API for backward compatibility
export * from './auth';
export * from './config';