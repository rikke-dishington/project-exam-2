export const createBookingSelectors = (get) => ({
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
  }
});
