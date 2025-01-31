import { apiClient, API_ROUTES } from './config';

export const profilesApi = {
  getProfile: (name) => {
    return apiClient(API_ROUTES.profiles.byName(name));
  },

  updateProfile: async (name, data) => {
    const updateData = {};
    
    // Validate data before sending
    if (data.avatar) {
      try {
        new URL(data.avatar);
        updateData.avatar = { url: data.avatar };
      } catch (error) {
        throw new Error('Invalid avatar URL');
      }
    }
    
    if (data.banner) {
      try {
        new URL(data.banner);
        updateData.banner = { url: data.banner };
      } catch (error) {
        throw new Error('Invalid banner URL');
      }
    }
    
    if (typeof data.venueManager === 'boolean') {
      updateData.venueManager = data.venueManager;
    }
    
    if (data.bio?.trim()) {
      const bio = data.bio.trim();
      if (bio.length > 500) {
        throw new Error('Bio must be less than 500 characters');
      }
      updateData.bio = bio;
    }

    console.log('Sending update data:', updateData);
    console.log('To endpoint:', API_ROUTES.profiles.byName(name));

    try {
      const response = await apiClient(`${API_ROUTES.profiles.byName(name)}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });

      console.log('Profile update response:', response);
      return response.data;
    } catch (error) {
      // Add more specific error handling
      if (error.message.includes('401')) {
        throw new Error('Session expired. Please log in again.');
      }
      if (error.message.includes('413')) {
        throw new Error('Image URL too long. Please use a shorter URL.');
      }
      throw error;
    }
  },

  getBookings: (name) => {
    return apiClient(`${API_ROUTES.profiles.bookings(name)}?_venue=true`);
  },

  getVenues: (name) => {
    return apiClient(API_ROUTES.profiles.venues(name));
  }
};