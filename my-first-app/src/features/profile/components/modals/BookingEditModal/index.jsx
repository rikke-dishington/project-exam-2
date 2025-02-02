import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCalendar, FaUser } from 'react-icons/fa';
import { bookingApi } from '../../../../bookings/api/bookings';
import DatePickerModal from '../../../../bookings/components/modals/DatePickerModal';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  Form,
  InputGroup,
  Label,
  ButtonGroup,
  SaveButton,
  CancelButton,
  ErrorMessage,
  VenueInfo,
  PriceInfo,
  DatePickerButton,
  SelectedDates
} from './styles';

function EditBookingModal({ booking, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    dateFrom: new Date(booking.dateFrom),
    dateTo: new Date(booking.dateTo),
    guests: booking.guests
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateNights = () => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.round((formData.dateTo - formData.dateFrom) / msPerDay);
    return nights;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return nights * booking.venue.price;
  };

  const handleDateSelect = (start, end) => {
    setFormData(prev => ({
      ...prev,
      dateFrom: start,
      dateTo: end
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await bookingApi.update(booking.id, {
        ...formData,
        dateFrom: formData.dateFrom.toISOString(),
        dateTo: formData.dateTo.toISOString(),
        guests: Number(formData.guests)
      });
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleModalClick = (e) => {
    // Only close if clicking the dark overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Create a venue object without the current booking
  const venueWithFilteredBookings = {
    ...booking.venue,
    bookings: booking.venue.bookings
      ? booking.venue.bookings.filter(b => b.id !== booking.id)
      : []
  };

  return (
    <>
      <Modal onClick={handleModalClick}>
        <ModalContent>
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
            <DatePickerButton 
              type="button"
              onClick={() => setIsDatePickerOpen(true)}
            >
              <FaCalendar />
              <span>Change dates</span>
            </DatePickerButton>

            {formData.dateFrom && formData.dateTo && (
              <SelectedDates>
                <div>
                  <strong>Check-in:</strong> {formatDate(formData.dateFrom)}
                </div>
                <div>
                  <strong>Check-out:</strong> {formatDate(formData.dateTo)}
                </div>
              </SelectedDates>
            )}

            <InputGroup>
              <Label>
                <FaUser />
                Number of Guests
              </Label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleGuestsChange}
                min="1"
                max={booking.venue.maxGuests}
              />
            </InputGroup>

            <PriceInfo>
              <div>
                <strong>Total nights:</strong> {calculateNights()}
              </div>
              <div>
                <strong>Total price:</strong> ${calculateTotalPrice()}
              </div>
            </PriceInfo>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <ButtonGroup>
              <CancelButton type="button" onClick={onClose}>
                Cancel
              </CancelButton>
              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </SaveButton>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </Modal>

      {isDatePickerOpen && (
        <DatePickerModal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          onApply={() => setIsDatePickerOpen(false)}
          venue={venueWithFilteredBookings}
          startDate={formData.dateFrom}
          endDate={formData.dateTo}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
}

EditBookingModal.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      maxGuests: PropTypes.number.isRequired,
      bookings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        dateFrom: PropTypes.string.isRequired,
        dateTo: PropTypes.string.isRequired
      }))
    }).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EditBookingModal; 