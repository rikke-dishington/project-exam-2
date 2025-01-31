import { useState, useEffect } from 'react';
import { FaTimes, FaCalendar, FaUser } from 'react-icons/fa';
import { venueApi } from '../../../../utils/api/venues';
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

function BookingsModal({ venue, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Bookings for {venue.name}</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>

        {isLoading && <LoadingSpinner><FaCalendar /> Loading bookings...</LoadingSpinner>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {!isLoading && !error && (
          bookings.length === 0 ? (
            <NoBookings>
              <FaCalendar />
              <p>No bookings found for this venue</p>
            </NoBookings>
          ) : (
            <BookingsList>
              {bookings.map(booking => (
                <BookingItem key={booking.id}>
                  <BookingHeader>
                    <GuestInfo>
                      <FaUser />
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

export default BookingsModal; 