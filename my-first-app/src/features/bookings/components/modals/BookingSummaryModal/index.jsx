import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../../context/UserContext';
import useBookingStore from '../../../stores/booking';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  BookingDetails,
  DateRange,
  GuestCount,
  PriceBreakdown,
  TotalPrice,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
  LoginButton
} from './styles';

/**
 * BookingSummaryModal Component
 * 
 * A modal component that displays a summary of the booking before confirmation.
 * Shows booking details, price breakdown, and handles the final booking submission.
 * 
 * Features:
 * - Displays venue name and booking dates
 * - Shows guest count
 * - Calculates and displays price breakdown
 * - Handles authentication state
 * - Provides booking confirmation
 * - Redirects to login if needed
 * - Navigates to bookings page after successful booking
 * - Error handling for booking submission
 * 
 * @component
 * @example
 * ```jsx
 * <BookingSummaryModal
 *   venue={{
 *     id: '123',
 *     name: 'Beach House',
 *     price: 100
 *   }}
 * />
 * ```
 * 
 * State Management:
 * - Uses UserContext for authentication state
 * - Uses BookingStore for booking data and actions
 * - Manages modal visibility
 * - Handles booking submission state
 * 
 * @param {Object} props - Component props
 * @param {Object} props.venue - The venue being booked
 * @param {string} props.venue.id - Venue identifier
 * @param {string} props.venue.name - Name of the venue
 * @param {number} props.venue.price - Price per night
 */
function BookingSummaryModal({ venue }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { 
    currentBooking, 
    isModalOpen, 
    closeModal, 
    submitBooking,
    calculateTotalPrice,
    getNights
  } = useBookingStore();

  if (!isModalOpen || !currentBooking || !venue) return null;

  /**
   * Handles the booking confirmation
   * Submits the booking and navigates to the user's bookings page
   */
  const handleConfirm = async () => {
    try {
      await submitBooking();
      closeModal();
      navigate(`/profiles/${user.name}/bookings`);
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  /**
   * Handles the login redirection
   * Closes the modal and navigates to the login page
   */
  const handleLogin = () => {
    closeModal();
    navigate('/login');
  };

  const totalPrice = calculateTotalPrice();
  const nights = getNights();

  return (
    <Modal onClick={closeModal} role="dialog" aria-label="Booking summary">
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Booking Summary</h2>
          <CloseButton onClick={closeModal} aria-label="Close summary">×</CloseButton>
        </Header>

        <BookingDetails>
          <h3>{venue?.name || 'Venue'}</h3>
          <DateRange>
            <div>Check-in: {currentBooking.dateFrom.toLocaleDateString()}</div>
            <div>Check-out: {currentBooking.dateTo.toLocaleDateString()}</div>
          </DateRange>
          <GuestCount>{currentBooking.guests} guests</GuestCount>

          <PriceBreakdown>
            <div>
              <span>${venue?.price || 0} × {nights} nights</span>
              <span>${(venue?.price || 0) * nights}</span>
            </div>
          </PriceBreakdown>

          <TotalPrice>
            <span>Total</span>
            <span>${totalPrice}</span>
          </TotalPrice>
        </BookingDetails>

        <ButtonGroup>
          <CancelButton 
            onClick={closeModal}
            aria-label="Cancel booking process"
          >
            Cancel
          </CancelButton>
          {user ? (
            <ConfirmButton 
              onClick={handleConfirm}
              aria-label="Confirm and complete booking"
            >
              Confirm Booking
            </ConfirmButton>
          ) : (
            <LoginButton 
              onClick={handleLogin}
              aria-label="Login to complete booking"
            >
              Login to Book
            </LoginButton>
          )}
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

export default BookingSummaryModal; 