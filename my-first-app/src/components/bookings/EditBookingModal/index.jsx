import { useState } from 'react';
import { FaTimes, FaCalendar, FaUser } from 'react-icons/fa';
import { bookingApi } from '../../../utils/api/bookings';
import Calendar from '../Calendar';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  Form,
  InputGroup,
  Label,
  GuestInput,
  ButtonGroup,
  SaveButton,
  CancelButton,
  ErrorMessage,
  VenueInfo,
  PriceInfo
} from './styles';

function EditBookingModal({ booking, onClose, onUpdate }) {
  const [dates, setDates] = useState({
    dateFrom: new Date(booking.dateFrom),
    dateTo: new Date(booking.dateTo)
  });
  const [guests, setGuests] = useState(booking.guests);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateNights = () => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.round((dates.dateTo - dates.dateFrom) / msPerDay);
    return nights;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * booking.venue.price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updateData = {
        dateFrom: dates.dateFrom.toISOString(),
        dateTo: dates.dateTo.toISOString(),
        guests: Number(guests)
      };

      await bookingApi.update(booking.id, updateData);
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Edit Booking</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>

        <VenueInfo>
          <h3>{booking.venue.name}</h3>
          <p>
            <strong>Price per night:</strong> ${booking.venue.price}
          </p>
          <p>
            <strong>Maximum guests:</strong> {booking.venue.maxGuests}
          </p>
        </VenueInfo>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>
              <FaCalendar />
              Dates
            </Label>
            <Calendar
              startDate={dates.dateFrom}
              endDate={dates.dateTo}
              onChange={(start, end) => setDates({ dateFrom: start, dateTo: end })}
              minDate={new Date()}
              maxGuests={booking.venue.maxGuests}
            />
          </InputGroup>

          <InputGroup>
            <Label>
              <FaUser />
              Number of Guests
            </Label>
            <GuestInput
              type="number"
              min="1"
              max={booking.venue.maxGuests}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </InputGroup>

          <PriceInfo>
            <div>
              <span>${booking.venue.price} × {calculateNights()} nights</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <div className="total">
              <strong>Total</strong>
              <strong>${calculateTotalPrice()}</strong>
            </div>
          </PriceInfo>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </CancelButton>
            <SaveButton type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
}

export default EditBookingModal; 