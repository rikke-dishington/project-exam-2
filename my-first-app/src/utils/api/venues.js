import { API_URLS, fetchWithError } from './config';

export const getAllVenues = async (options = {}) => {
  const params = new URLSearchParams();
  
  if (options.sort) params.append('sort', options.sort);
  if (options.sortOrder) params.append('sortOrder', options.sortOrder);
  if (options.limit) params.append('limit', options.limit);
  if (options.offset) params.append('offset', options.offset);
  if (options._owner) params.append('_owner', options._owner);
  if (options._bookings) params.append('_bookings', options._bookings);

  const queryString = params.toString();
  const url = `${API_URLS.venues}${queryString ? `?${queryString}` : ''}`;
  
  return fetchWithError(url);
};

export const getVenueById = async (id) => {
  return fetchWithError(`${API_URLS.venues}/${id}`);
};

export const createVenue = async (venueData) => {
  return fetchWithError(API_URLS.venues, {
    method: 'POST',
    body: JSON.stringify(venueData)
  });
};

export const updateVenue = async (id, venueData) => {
  return fetchWithError(`${API_URLS.venues}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(venueData)
  });
};

export const deleteVenue = async (id) => {
  return fetchWithError(`${API_URLS.venues}/${id}`, {
    method: 'DELETE'
  });
};