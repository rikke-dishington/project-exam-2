/**
 * Creates and returns the booking store selectors
 * 
 * @param {Function} get - Zustand's get function to access state
 * @returns {Object} Object containing all booking selectors
 */
export const createBookingSelectors = (get) => ({
  /**
   * Calculates the total price for the current booking
   * Multiplies the nightly rate by the number of nights
   * 
   * @returns {number} Total price for the booking
   * @example
   * ```js
   * const totalPrice = useBookingStore.getState().calculateTotalPrice();
   * // If price is 100 and booking is for 3 nights
   * // Returns 300
   * ```
   */
  calculateTotalPrice: () => {
    const booking = get().currentBooking;
    if (!booking?.dateFrom || !booking?.dateTo || !booking?.price) return 0;
    
    const nights = Math.ceil(
      (new Date(booking.dateTo) - new Date(booking.dateFrom)) / 
      (1000 * 60 * 60 * 24)
    );
    
    return booking.price * nights;
  },

  /**
   * Calculates the number of nights for the current booking
   * 
   * @returns {number} Number of nights between check-in and check-out
   * @example
   * ```js
   * const nights = useBookingStore.getState().getNights();
   * // If booking is from 2024-01-01 to 2024-01-04
   * // Returns 3
   * ```
   */
  getNights: () => {
    const booking = get().currentBooking;
    if (!booking?.dateFrom || !booking?.dateTo) return 0;
    
    return Math.ceil(
      (new Date(booking.dateTo) - new Date(booking.dateFrom)) / 
      (1000 * 60 * 60 * 24)
    );
  }
});
