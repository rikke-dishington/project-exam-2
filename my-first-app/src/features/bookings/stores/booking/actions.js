import { bookingApi } from '../../api/bookings';

/**
 * Creates and returns the booking store actions
 * 
 * @param {Function} set - Zustand's set function to update state
 * @param {Function} get - Zustand's get function to access state
 * @returns {Object} Object containing all booking actions
 */
export const createBookingActions = (set, get) => ({
  /**
   * Updates the booking dates
   * 
   * @param {Date} dateFrom - Check-in date
   * @param {Date} dateTo - Check-out date
   */
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

  /**
   * Updates the number of guests
   * 
   * @param {number|string} guests - Number of guests (converted to number)
   */
  setGuests: (guests) => {
    set((state) => ({
      currentBooking: {
        ...state.currentBooking,
        guests: Number(guests)
      },
      error: null
    }));
  },

  /**
   * Initializes a new booking for a venue
   * Resets all booking state to default values
   * 
   * @param {Object} venue - The venue to create a booking for
   * @param {string} venue.id - Venue identifier
   * @param {number} venue.price - Price per night
   */
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

  /**
   * Opens the booking summary modal
   * Validates that required booking details are present
   * Sets error if validation fails
   */
  openModal: () => {
    const { currentBooking } = get();
    if (!currentBooking?.dateFrom || !currentBooking?.dateTo || !currentBooking?.guests) {
      set({ error: 'Please select dates and number of guests' });
      return;
    }
    set({ isModalOpen: true, error: null });
  },
  
  /**
   * Closes the booking summary modal
   * Clears any existing errors
   */
  closeModal: () => set({ isModalOpen: false, error: null }),

  /**
   * Submits the booking to the API
   * Validates booking details before submission
   * 
   * @returns {Promise<Object>} The created booking from the API
   * @throws {Error} If validation fails or API request fails
   */
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

  /**
   * Clears all booking state
   * Used when unmounting or resetting the booking flow
   */
  clearBooking: () => {
    set({ 
      currentBooking: null, 
      isModalOpen: false, 
      error: null,
      isLoading: false
    });
  }
});
