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

  const handleConfirm = async () => {
    try {
      await submitBooking();
      closeModal();
      navigate(`/profiles/${user.name}/bookings`);
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  const handleLogin = () => {
    closeModal();
    navigate('/login');
  };

  const totalPrice = calculateTotalPrice();
  const nights = getNights();

  return (
    <Modal onClick={closeModal}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Booking Summary</h2>
          <CloseButton onClick={closeModal}>×</CloseButton>
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
          <CancelButton onClick={closeModal}>
            Cancel
          </CancelButton>
          {user ? (
            <ConfirmButton onClick={handleConfirm}>
              Confirm Booking
            </ConfirmButton>
          ) : (
            <LoginButton onClick={handleLogin}>
              Login to Book
            </LoginButton>
          )}
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

export default BookingSummaryModal; 