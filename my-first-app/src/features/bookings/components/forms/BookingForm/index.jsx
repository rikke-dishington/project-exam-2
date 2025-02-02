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