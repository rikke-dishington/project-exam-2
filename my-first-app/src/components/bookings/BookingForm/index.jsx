import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../Calendar';
import GuestSelector from '../GuestSelector';
import { useUser } from '../../../context/UserContext';
import useBookingStore from '../../../stores/bookingStore';
import BookingSummaryModal from '../BookingSummaryModal';
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
  console.log('Venue in form:', venue);
  const navigate = useNavigate();
  const { user } = useUser();
  const { 
    currentBooking,
    initializeBooking,
    setBookingDates,
    setGuests,
    openModal,
    error 
  } = useBookingStore();

  console.log('Venue data:', { 
    id: venue.id, 
    maxGuests: venue.maxGuests, 
    price: venue.price 
  });
  console.log('Current guests:', currentBooking?.guests);

  useEffect(() => {
    initializeBooking(venue);
  }, [venue, initializeBooking]);

  const handleDateSelect = (startDate, endDate) => {
    setBookingDates(startDate, endDate);
  };

  const handleGuestChange = (newGuests) => {
    console.log('Handling guest change:', newGuests);
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

      <GuestSelector
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

      {venue && <BookingSummaryModal venue={venue} />}
    </FormContainer>
  );
}

export default BookingForm; 