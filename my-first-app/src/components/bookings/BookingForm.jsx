import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import useBookingStore from '../../stores/bookingStore';
import DateRangePicker from './DateRangePicker';
import GuestSelector from './GuestSelector';
import {
  BookingFormContainer,
  FormHeader,
  PriceInfo,
  PricePerNight,
  MaxGuests,
  SelectionWrapper,
  GuestButton,
  PriceSummary,
  PriceDetails,
  TotalPriceRow,
  BookButton,
  ErrorMessage,
} from './BookingForm.styles';

const BookingForm = ({ venue }) => {
  const { 
    currentBooking,
    error,
    initializeBooking,
    setBookingDates,
    setGuests,
    openModal,
    calculateTotalPrice,
    getNights
  } = useBookingStore();

  const [showGuestSelector, setShowGuestSelector] = useState(false);

  useEffect(() => {
    initializeBooking(venue);
  }, [venue, initializeBooking]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setBookingDates(start, end);
  };

  const handleGuestSelection = (count) => {
    setGuests(count);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    openModal();
  };

  if (!currentBooking) return null;

  const nights = getNights();
  const totalPrice = calculateTotalPrice();
  const isBookingComplete = currentBooking.dateFrom && 
                           currentBooking.dateTo && 
                           currentBooking.guests;

  return (
    <BookingFormContainer onSubmit={handleBookNow}>
      <FormHeader>Book your stay</FormHeader>
      
      <PriceInfo>
        <PricePerNight>${venue.price} / night</PricePerNight>
        <MaxGuests>{venue.maxGuests} guests max</MaxGuests>
      </PriceInfo>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SelectionWrapper>
        <DateRangePicker
          startDate={currentBooking.dateFrom}
          endDate={currentBooking.dateTo}
          onChange={handleDateChange}
          minDate={new Date()}
          placeholderText="Select dates"
        />
      </SelectionWrapper>

      <SelectionWrapper>
        <GuestButton
          type="button"
          onClick={() => setShowGuestSelector(!showGuestSelector)}
        >
          {currentBooking.guests} {currentBooking.guests === 1 ? 'guest' : 'guests'}
        </GuestButton>

        {showGuestSelector && (
          <GuestSelector
            maxGuests={currentBooking.maxGuests}
            guests={currentBooking.guests}
            onChange={handleGuestSelection}
            onClose={() => setShowGuestSelector(false)}
          />
        )}
      </SelectionWrapper>

      <PriceSummary>
        <PriceDetails>
          <span>${venue.price} × {nights} nights</span>
          <span>${totalPrice}</span>
        </PriceDetails>
        <TotalPriceRow>
          <span>Total</span>
          <span>${totalPrice}</span>
        </TotalPriceRow>
      </PriceSummary>

      <BookButton 
        type="submit" 
        disabled={!isBookingComplete}
      >
        Book Now
      </BookButton>
    </BookingFormContainer>
  );
};

export default BookingForm; 