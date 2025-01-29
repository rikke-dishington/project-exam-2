import { create } from 'zustand';
import { bookingApi } from '../utils/api/bookings';

const useBookingStore = create((set, get) => ({
  // Booking state
  currentBooking: null,
  isModalOpen: false,
  error: null,
  isLoading: false,

  // Booking actions
  setBookingDates: (dateFrom, dateTo) => {
    set((state) => ({
      currentBooking: {
        ...state.currentBooking,
        dateFrom,
        dateTo
      }
    }));
  },

  setGuests: (guests) => {
    console.log('Setting guests to:', guests); // Debug log
    set((state) => {
      const newBooking = {
        ...state.currentBooking,
        guests: Number(guests) // Ensure guests is a number
      };
      console.log('New booking state:', newBooking); // Debug log
      return {
        currentBooking: {
          ...state.currentBooking,
          guests: Number(guests)
        }
      };
    });
  },

  initializeBooking: (venue) => {
    set({
      currentBooking: {
        venueId: venue.id,
        dateFrom: null,
        dateTo: null,
        guests: 1,
        price: venue.price,
      },
      error: null
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
      const response = await bookingApi.create({
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