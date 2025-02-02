import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FaTimes, FaCalendar, FaUser } from 'react-icons/fa';
import { venueApi } from '../../../../venues/api/venues';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  BookingsList,
  BookingItem,
  BookingHeader,
  BookingDetails,
  GuestInfo,
  DateRange,
  NoBookings,
  LoadingSpinner,
  ErrorMessage
} from './styles';

/**
 * VenueBookingsModal Component
 * 
 * A modal component that displays all bookings for a specific venue.
 * Shows booking details including customer information, dates, and guest count.
 * 
 * Features:
 * - Fetches and displays venue bookings
 * - Sorts bookings by date
 * - Shows loading state
 * - Handles errors gracefully
 * - Displays empty state
 * - Responsive design
 * - Click outside to close
 * - Accessible UI elements
 * 
 * @component
 * @example
 * ```jsx
 * <VenueBookingsModal
 *   venue={{
 *     id: '123',
 *     name: 'Beach House'
 *   }}
 *   onClose={() => setIsModalOpen(false)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.venue - The venue object
 * @param {string} props.venue.id - Venue identifier
 * @param {string} props.venue.name - Name of the venue
 * @param {Function} props.onClose - Callback when modal is closed
 */
function VenueBookingsModal({ venue, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches bookings data for the venue
   * Sorts bookings by date in descending order
   */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await venueApi.getById(venue.id);
        const venueData = response.data || response;
        const bookingsData = venueData.bookings || [];
        
        const sortedBookings = bookingsData.sort((a, b) => 
          new Date(b.dateFrom) - new Date(a.dateFrom)
        );
        setBookings(sortedBookings);
      } catch (err) {
        setError('Failed to load bookings');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [venue.id]);

  /**
   * Formats a date string into a readable format
   * 
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date (e.g., "Mon, Jan 1, 2024")
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Modal onClick={onClose} role="dialog" aria-label="Venue bookings">
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Bookings for {venue.name}</h2>
          <CloseButton onClick={onClose} aria-label="Close bookings modal">
            <FaTimes />
          </CloseButton>
        </Header>

        {isLoading && (
          <LoadingSpinner role="status">
            <FaCalendar aria-hidden="true" /> 
            <span>Loading bookings...</span>
          </LoadingSpinner>
        )}
        
        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
        
        {!isLoading && !error && (
          bookings.length === 0 ? (
            <NoBookings>
              <FaCalendar aria-hidden="true" />
              <p>No bookings found for this venue</p>
            </NoBookings>
          ) : (
            <BookingsList>
              {bookings.map(booking => (
                <BookingItem key={booking.id}>
                  <BookingHeader>
                    <GuestInfo>
                      <FaUser aria-hidden="true" />
                      <span>{booking.customer.name}</span>
                      <span> • {booking.guests} guests</span>
                    </GuestInfo>
                  </BookingHeader>
                  <BookingDetails>
                    <DateRange>
                      <div>
                        <strong>Check-in:</strong>
                        <span>{formatDate(booking.dateFrom)}</span>
                      </div>
                      <div>
                        <strong>Check-out:</strong>
                        <span>{formatDate(booking.dateTo)}</span>
                      </div>
                    </DateRange>
                  </BookingDetails>
                </BookingItem>
              ))}
            </BookingsList>
          )
        )}
      </ModalContent>
    </Modal>
  );
}

VenueBookingsModal.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default VenueBookingsModal; 