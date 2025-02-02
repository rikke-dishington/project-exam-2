import { apiClient, API_ROUTES } from '../../../api/config';

export const venueApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiClient(`${API_ROUTES.venues.base}?${queryString}`);
    return response.data;
  },

  getById: async (id) => {
    try {
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid venue ID');
      }
      const response = await apiClient(`${API_ROUTES.venues.byId(id)}?_bookings=true&_customer=true&_owner=true`);
      return response;
    } catch (error) {
      console.error('Failed to fetch venue:', error);
      throw error;
    }
  },

  search: async (query) => {
    const response = await apiClient(`${API_ROUTES.venues.search}?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient(API_ROUTES.venues.base, {
      method: 'POST',
      body: data,
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient(API_ROUTES.venues.byId(id), {
      method: 'PUT',
      body: data,
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient(API_ROUTES.venues.byId(id), {
      method: 'DELETE',
    });
    return response.data;
  },

  getVenuesByProfile: async (profileName) => {
    try {
      const response = await apiClient(API_ROUTES.profiles.venues(profileName));
      return response.data;
    } catch (error) {
      console.error('Failed to fetch venues:', error);
      throw error;
    }
  },

  createVenue: async (venueData) => {
    try {
      // Validate required fields
      if (!venueData.location?.city) {
        throw new Error('City is required');
      }
      if (!venueData.location?.country) {
        throw new Error('Country is required');
      }

      const formattedData = {
        name: String(venueData.name),
        description: String(venueData.description || ''),
        media: Array.isArray(venueData.media) 
          ? venueData.media.map(img => ({
              url: typeof img === 'string' ? img : img.url,
              alt: typeof img === 'string' ? `Image of ${venueData.name}` : img.alt
            }))
          : [],
        price: Number(venueData.price),
        maxGuests: Number(venueData.maxGuests),
        rating: 0,
        meta: {
          wifi: Boolean(venueData.meta?.wifi),
          parking: Boolean(venueData.meta?.parking),
          breakfast: Boolean(venueData.meta?.breakfast),
          pets: Boolean(venueData.meta?.pets)
        },
        location: {
          address: String(venueData.location?.address || ''),
          city: String(venueData.location.city),
          zip: String(venueData.location?.zip || ''),
          country: String(venueData.location.country),
          continent: String(venueData.location?.continent || ''),
          lat: 0,
          lng: 0
        }
      };

      const response = await apiClient(API_ROUTES.venues.base, {
        method: 'POST',
        body: formattedData
      });

      return response.data;
    } catch (error) {
      console.error('Create venue error details:', {
        error,
        message: error.message,
        data: venueData
      });
      throw error;
    }
  },

  updateVenue: async (id, venueData) => {
    try {
      // Validate required fields
      if (!venueData.location?.city) {
        throw new Error('City is required');
      }
      if (!venueData.location?.country) {
        throw new Error('Country is required');
      }

      const formattedData = {
        name: String(venueData.name),
        description: String(venueData.description || ''),
        media: Array.isArray(venueData.media) 
          ? venueData.media.map(img => typeof img === 'string' ? img : img.url).filter(Boolean)
          : [],
        price: Number(venueData.price),
        maxGuests: Number(venueData.maxGuests),
        rating: venueData.rating || 0,
        meta: {
          wifi: Boolean(venueData.meta?.wifi),
          parking: Boolean(venueData.meta?.parking),
          breakfast: Boolean(venueData.meta?.breakfast),
          pets: Boolean(venueData.meta?.pets)
        },
        location: {
          address: String(venueData.location?.address || ''),
          city: String(venueData.location.city),
          zip: String(venueData.location?.zip || ''),
          country: String(venueData.location.country),
          continent: String(venueData.location?.continent || ''),
          lat: Number(venueData.location?.lat || 0),
          lng: Number(venueData.location?.lng || 0)
        }
      };

      const response = await apiClient(API_ROUTES.venues.byId(id), {
        method: 'PUT',
        body: formattedData
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update venue:', error);
      throw error;
    }
  },

  deleteVenue: async (id) => {
    try {
      await apiClient(API_ROUTES.venues.byId(id), {
        method: 'DELETE'
      });
      return true;
    } catch (error) {
      console.error('Failed to delete venue:', error);
      throw error;
    }
  },

  getVenueBookings: async (id, userName) => {
    try {
      const response = await apiClient(API_ROUTES.profiles.bookings(userName));
      
      const venueBookings = response.data.filter(booking => booking.venue.id === id);
      
      return venueBookings;
    } catch (error) {
      console.error('Failed to fetch venue bookings:', error);
      throw error;
    }
  }
};