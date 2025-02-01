import { bookingApi } from '../../api/bookings';

export const createBookingActions = (set, get) => ({
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
    set((state) => ({
      currentBooking: {
        ...state.currentBooking,
        guests: Number(guests)
      }
    }));
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

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

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

  clearBooking: () => {
    set({ 
      currentBooking: null, 
      isModalOpen: false, 
      error: null 
    });
  }
});
