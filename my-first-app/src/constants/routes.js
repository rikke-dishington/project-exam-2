export const ROUTES = {
  // Public routes
  HOME: '/venues',
  LOGIN: '/login',
  REGISTER: '/register',
  VENUES: '/venues',
  VENUE_DETAIL: '/venue/:id',
  
  // Helper function to generate dynamic routes
  getVenueDetail: (id) => `/venue/${id}`,
};
