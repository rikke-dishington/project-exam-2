import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../../stores/bookingStore';
import { 
  ModalOverlay,
  ModalContent,
  SummaryContainer,
  SummaryItem,
  SummaryTitle,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
  ErrorMessage,
  PriceSummary,
  PriceDetails,
  TotalPriceRow,
  LoadingSpinner
} from './BookingSummaryModal.styles';

const BookingSummaryModal = () => {
  const navigate = useNavigate();
  const { 
    currentBooking,
    isModalOpen,
    isLoading,
    error,
    closeModal,
    submitBooking,
    clearBooking,
    calculateTotalPrice,
    getNights
  } = useBookingStore();

  if (!isModalOpen || !currentBooking) return null;

  const handleConfirm = async () => {
    try {
      await submitBooking();
      navigate('/account/bookings');
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleClose = () => {
    clearBooking();
    closeModal();
  };

  const totalPrice = calculateTotalPrice();
  const nights = getNights();

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <SummaryTitle>Booking Summary</SummaryTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SummaryContainer>
          <SummaryItem>
            <span>Venue:</span>
            <span>{currentBooking.venueName}</span>
          </SummaryItem>
          
          <SummaryItem>
            <span>Check-in:</span>
            <span>{format(new Date(currentBooking.dateFrom), 'PPP')}</span>
          </SummaryItem>
          
          <SummaryItem>
            <span>Check-out:</span>
            <span>{format(new Date(currentBooking.dateTo), 'PPP')}</span>
          </SummaryItem>
          
          <SummaryItem>
            <span>Guests:</span>
            <span>{currentBooking.guests} {currentBooking.guests === 1 ? 'guest' : 'guests'}</span>
          </SummaryItem>

          <PriceSummary>
            <PriceDetails>
              <span>${currentBooking.price} × {nights} nights</span>
              <span>${totalPrice}</span>
            </PriceDetails>
            <TotalPriceRow>
              <span>Total</span>
              <span>${totalPrice}</span>
            </TotalPriceRow>
          </PriceSummary>
        </SummaryContainer>

        <ButtonGroup>
          <ConfirmButton 
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Confirm Booking'}
          </ConfirmButton>
          <CancelButton 
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </CancelButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BookingSummaryModal; 