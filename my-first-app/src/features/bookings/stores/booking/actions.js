import { bookingApi } from '../../api/bookings';

export const createBookingActions = (set, get) => ({
  setBookingDates: (dateFrom, dateTo) => {
    set((state) => ({
      currentBooking: {
        ...state.currentBooking,
        dateFrom,
        dateTo
      },
      error: null
    }));
  },

  setGuests: (guests) => {
    set((state) => ({
      currentBooking: {
        ...state.currentBooking,
        guests: Number(guests)
      },
      error: null
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
      isModalOpen: false,
      error: null
    });
  },

  openModal: () => {
    const { currentBooking } = get();
    if (!currentBooking?.dateFrom || !currentBooking?.dateTo || !currentBooking?.guests) {
      set({ error: 'Please select dates and number of guests' });
      return;
    }
    set({ isModalOpen: true, error: null });
  },
  
  closeModal: () => set({ isModalOpen: false, error: null }),

  submitBooking: async () => {
    const booking = get().currentBooking;
    
    if (!booking?.dateFrom || !booking?.dateTo || !booking?.guests) {
      set({ error: 'Please fill in all booking details' });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await bookingApi.create({
        dateFrom: booking.dateFrom.toISOString(),
        dateTo: booking.dateTo.toISOString(),
        guests: booking.guests,
        venueId: booking.venueId
      });

      set({ 
        currentBooking: null, 
        isModalOpen: false, 
        isLoading: false,
        error: null
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
      error: null,
      isLoading: false
    });
  }
});
