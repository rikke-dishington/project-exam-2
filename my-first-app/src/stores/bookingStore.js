import { create } from 'zustand';
import { createBooking } from '../utils/api/bookings';

const useBookingStore = create((set, get) => ({
  // Booking state
  currentBooking: null,
  isModalOpen: false,
  error: null,
  isLoading: false,

  // Booking actions
  setBookingDates: (startDate, endDate) => {
    const current = get().currentBooking;
    set({ 
      currentBooking: { 
        ...current, 
        dateFrom: startDate, 
        dateTo: endDate 
      } 
    });
  },

  setGuests: (guests) => {
    const current = get().currentBooking;
    set({ 
      currentBooking: { 
        ...current, 
        guests 
      } 
    });
  },

  initializeBooking: (venue) => {
    set({
      currentBooking: {
        venueId: venue.id,
        venueName: venue.name,
        price: venue.price,
        dateFrom: null,
        dateTo: null,
        guests: 1,
        maxGuests: venue.maxGuests
      }
    });
  },

  // Modal controls
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // Booking submission
  submitBooking: async () => {
    const booking = get().currentBooking;
    
    if (!booking?.dateFrom || !booking?.dateTo || !booking?.guests) {
      set({ error: 'Please fill in all booking details' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await createBooking({
        dateFrom: booking.dateFrom,
        dateTo: booking.dateTo,
        guests: booking.guests,
        venueId: booking.venueId
      });

      set({ 
        currentBooking: null, 
        isModalOpen: false, 
        isLoading: false 
      });

      return response;
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  // Utility functions
  calculateTotalPrice: () => {
    const booking = get().currentBooking;
    if (!booking?.dateFrom || !booking?.dateTo || !booking?.price) return 0;
    
    const nights = Math.ceil(
      (new Date(booking.dateTo) - new Date(booking.dateFrom)) / 
      (1000 * 60 * 60 * 24)
    );
    
    return booking.price * nights;
  },

  getNights: () => {
    const booking = get().currentBooking;
    if (!booking?.dateFrom || !booking?.dateTo) return 0;
    
    return Math.ceil(
      (new Date(booking.dateTo) - new Date(booking.dateFrom)) / 
      (1000 * 60 * 60 * 24)
    );
  },

  clearBooking: () => {
    set({ 
      currentBooking: null, 
      isModalOpen: false, 
      error: null 
    });
  }
}));

export default useBookingStore; 