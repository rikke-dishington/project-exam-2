import { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import Calendar from '../../../../../components/common/Calendar';
import BookingGuestSelector from '../BookingGuestSelector';
import useBookingStore from '../../../stores/booking';
import DatePickerModal from '../../modals/DatePickerModal';
import {
  FormContainer,
  Header,
  Title,
  InfoBar,
  PriceDisplay,
  GuestLimit,
  DatePickerButton,
  SelectedDates,
  BookButton
} from './styles';

/**
 * BookingForm Component
 * 
 * A comprehensive form component for creating venue bookings.
 * Manages the booking process including date selection, guest count,
 * and booking confirmation.
 * 
 * Features:
 * - Date range selection with calendar modal
 * - Guest count selection with validation
 * - Price display per night
 * - Maximum guest limit display
 * - Booking validation and error handling
 * - Integration with booking store for state management
 * - Responsive and user-friendly interface
 * 
 * @component
 * @example
 * ```jsx
 * const venue = {
 *   id: '123',
 *   price: 100,
 *   maxGuests: 4,
 *   // ... other venue properties
 * };
 * 
 * <BookingForm venue={venue} />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.venue - The venue object containing booking details
 * @param {string} props.venue.id - Unique identifier for the venue
 * @param {number} props.venue.price - Price per night
 * @param {number} props.venue.maxGuests - Maximum number of guests allowed
 */
function BookingForm({ venue }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { 
    currentBooking,
    initializeBooking,
    setBookingDates,
    setGuests,
    openModal,
    error 
  } = useBookingStore();

  /**
   * Initializes the booking state with venue data
   * Called when the component mounts or when venue changes
   */
  useEffect(() => {
    initializeBooking(venue);
  }, [venue, initializeBooking]);

  /**
   * Handles date selection from the calendar
   * Updates the booking store with selected dates
   * 
   * @param {Date} startDate - Check-in date
   * @param {Date} endDate - Check-out date
   */
  const handleDateSelect = (startDate, endDate) => {
    setBookingDates(startDate, endDate);
  };

  /**
   * Handles changes in guest count
   * Updates the booking store with new guest count
   * 
   * @param {number} newGuests - New number of guests selected
   */
  const handleGuestChange = (newGuests) => {
    setGuests(newGuests);
  };

  /**
   * Initiates the booking process
   * Opens the booking confirmation modal
   */
  const handleBooking = async () => {
    openModal();
  };

  /**
   * Formats a date into a readable string
   * 
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted date string (e.g., "Jan 1, 2024")
   */
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <FormContainer>
      <Header>
        <Title>Book your stay now</Title>
        <InfoBar>
          <PriceDisplay>
            <span className="amount">${venue.price}</span>
            <span className="label"> per night</span>
          </PriceDisplay>
          <GuestLimit>
            <span>{venue.maxGuests} guests</span>
          </GuestLimit>
        </InfoBar>
      </Header>

      <DatePickerButton onClick={() => setIsDatePickerOpen(true)}>
        <FaCalendar />
        <span>
          {currentBooking?.dateFrom && currentBooking?.dateTo
            ? 'Change dates'
            : 'Select dates'}
        </span>
      </DatePickerButton>

      {currentBooking?.dateFrom && currentBooking?.dateTo && (
        <SelectedDates>
          <div>
            <strong>Check-in:</strong> {formatDate(currentBooking.dateFrom)}
          </div>
          <div>
            <strong>Check-out:</strong> {formatDate(currentBooking.dateTo)}
          </div>
        </SelectedDates>
      )}

      <BookingGuestSelector
        value={currentBooking?.guests || 1}
        onChange={handleGuestChange}
        maxGuests={venue.maxGuests}
      />

      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onApply={() => setIsDatePickerOpen(false)}
        venue={venue}
        startDate={currentBooking?.dateFrom}
        endDate={currentBooking?.dateTo}
        onDateSelect={handleDateSelect}
        error={error}
      />

      <BookButton 
        onClick={handleBooking}
        disabled={!currentBooking?.dateFrom || !currentBooking?.dateTo}
      >
        {!currentBooking?.dateFrom || !currentBooking?.dateTo 
          ? 'Select dates to book' 
          : 'Book Now'
        }
      </BookButton>
    </FormContainer>
  );
}

export default BookingForm; 