import { useEffect } from 'react';
import Calendar from '../../../../../components/common/Calendar';
import BookingGuestSelector from '../BookingGuestSelector';
import useBookingStore from '../../../stores/booking';
import {
  FormContainer,
  Header,
  Title,
  InfoBar,
  PriceDisplay,
  GuestLimit,
  BookButton
} from './styles';

function BookingForm({ venue }) {
  const { 
    currentBooking,
    initializeBooking,
    setBookingDates,
    setGuests,
    openModal,
    error 
  } = useBookingStore();

  useEffect(() => {
    initializeBooking(venue);
  }, [venue, initializeBooking]);

  const handleDateSelect = (startDate, endDate) => {
    setBookingDates(startDate, endDate);
  };

  const handleGuestChange = (newGuests) => {
    setGuests(newGuests);
  };

  const handleBooking = async () => {
    openModal();
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

      <Calendar 
        venue={venue}
        onDateSelect={handleDateSelect}
        disabledDates={venue.bookings || []}
        error={error}
        startDate={currentBooking?.dateFrom}
        endDate={currentBooking?.dateTo}
      />

      <BookingGuestSelector
        value={currentBooking?.guests || 1}
        onChange={handleGuestChange}
        maxGuests={venue.maxGuests}
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