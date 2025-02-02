import { create } from 'zustand';
import { createBookingActions } from './actions';
import { createBookingSelectors } from './selectors';

/**
 * Booking Store
 * 
 * A Zustand store that manages the state and operations for venue bookings.
 * Handles the entire booking flow from date selection to submission.
 * 
 * State Structure:
 * @property {Object|null} currentBooking - Current booking being created/edited
 * @property {Date|null} currentBooking.dateFrom - Check-in date
 * @property {Date|null} currentBooking.dateTo - Check-out date
 * @property {number} currentBooking.guests - Number of guests
 * @property {string} currentBooking.venueId - ID of the venue being booked
 * @property {number} currentBooking.price - Price per night
 * @property {boolean} isModalOpen - Whether the booking summary modal is open
 * @property {string|null} error - Current error message if any
 * @property {boolean} isLoading - Loading state for async operations
 * 
 * @example
 * ```jsx
 * const {
 *   currentBooking,
 *   setBookingDates,
 *   setGuests,
 *   submitBooking,
 *   calculateTotalPrice
 * } = useBookingStore();
 * ```
 */
const useBookingStore = create((set, get) => ({
  // Initial state
  currentBooking: null,
  isModalOpen: false,
  error: null,
  isLoading: false,

  // Actions
  ...createBookingActions(set, get),

  // Selectors
  ...createBookingSelectors(get)
}));

export default useBookingStore; 