import { API_URLS } from './config';

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
  
  const response = await fetch(url);
  return response.json();
};

export const getVenueById = async (id) => {
  const response = await fetch(`${API_URLS.venues}/${id}`);
  return response.json();
};

export const createVenue = async (venueData) => {
  const response = await fetch(API_URLS.venues, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(venueData),
  });
  return response.json();
};

export const updateVenue = async (id, venueData) => {
  const response = await fetch(`${API_URLS.venues}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(venueData),
  });
  return response.json();
};

export const deleteVenue = async (id) => {
  const response = await fetch(`${API_URLS.venues}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};