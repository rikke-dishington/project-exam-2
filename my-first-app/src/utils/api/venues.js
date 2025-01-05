import { API_URLS, fetchWithError } from './config';

export const getAllVenues = (options = {}) => {
  const queryParams = new URLSearchParams({
    sort: options.sort || '',
    sortOrder: options.sortOrder || '',
    limit: options.limit || '',
    _owner: options._owner || false,
    _bookings: options._bookings || false,
  }).toString();

  const url = `${API_URLS.venues}${queryParams ? `?${queryParams}` : ''}`;
  return fetchWithError(url);
};

export const getVenueById = (id) => 
  fetchWithError(`${API_URLS.venues}/${id}`);

export const createVenue = (venueData) => 
  fetchWithError(API_URLS.venues, {
    method: 'POST',
    body: JSON.stringify(venueData),
  });

export const updateVenue = (id, venueData) => 
  fetchWithError(`${API_URLS.venues}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(venueData),
  });

export const deleteVenue = (id) => 
  fetchWithError(`${API_URLS.venues}/${id}`, {
    method: 'DELETE',
  });