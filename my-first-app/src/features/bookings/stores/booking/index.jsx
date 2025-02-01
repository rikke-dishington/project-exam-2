import { create } from 'zustand';
import { createBookingActions } from './actions';
import { createBookingSelectors } from './selectors';

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