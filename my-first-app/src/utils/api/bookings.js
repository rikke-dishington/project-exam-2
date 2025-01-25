import { API_URLS, fetchWithError } from './config';

export const getBookings = async (options = {}) => {
  const params = new URLSearchParams();
  
  if (options._customer) params.append('_customer', options._customer);
  if (options._venue) params.append('_venue', options._venue);
  if (options.sort) params.append('sort', options.sort);
  if (options.sortOrder) params.append('sortOrder', options.sortOrder);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);
  
  const queryString = params.toString();
  const url = `${API_URLS.bookings}${queryString ? `?${queryString}` : ''}`;
  
  return fetchWithError(url);
};

export const getBookingById = async (id) => {
  return fetchWithError(`${API_URLS.bookings}/${id}`);
};

export const createBooking = async (bookingData) => {
  return fetchWithError(API_URLS.bookings, {
    method: 'POST',
    body: JSON.stringify(bookingData)
  });
};

export const updateBooking = async (id, bookingData) => {
  return fetchWithError(`${API_URLS.bookings}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bookingData)
  });
};

export const deleteBooking = async (id) => {
  return fetchWithError(`${API_URLS.bookings}/${id}`, {
    method: 'DELETE'
  });
};

export const getVenueBookings = async (venueId) => {
  return fetchWithError(`${API_URLS.bookings}?venue=${venueId}`);
}; 