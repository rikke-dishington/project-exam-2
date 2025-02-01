import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCalendar, FaUser } from 'react-icons/fa';
import { bookingApi } from '../../../../bookings/api/bookings';
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
  PriceInfo
} from './styles';

function EditBookingModal({ booking, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    dateFrom: new Date(booking.dateFrom).toISOString().split('T')[0],
    dateTo: new Date(booking.dateTo).toISOString().split('T')[0],
    guests: booking.guests
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateNights = () => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.round((new Date(formData.dateTo) - new Date(formData.dateFrom)) / msPerDay);
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
      await bookingApi.update(booking.id, {
        ...formData,
        dateFrom: new Date(formData.dateFrom).toISOString(),
        dateTo: new Date(formData.dateTo).toISOString(),
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
              Check-in Date
            </Label>
            <input
              type="date"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>
              <FaCalendar />
              Check-out Date
            </Label>
            <input
              type="date"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>
              <FaUser />
              Number of Guests
            </Label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max={booking.venue.maxGuests}
              required
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
              {isLoading ? 'Updating...' : 'Update Booking'}
            </SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
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
      maxGuests: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EditBookingModal; 