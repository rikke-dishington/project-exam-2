import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getBookings, deleteBooking } from '../../utils/api/bookings';
import { FiCalendar, FiUsers, FiMapPin, FiTrash2 } from 'react-icons/fi';
import {
  BookingsContainer,
  BookingCard,
  BookingHeader,
  BookingDetails,
  BookingActions,
  DeleteButton,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  DetailItem
} from './BookingsList.styles';

function BookingsList() {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const data = await getBookings({
          _customer: true,
          _venue: true
        });
        
        const sortedBookings = data.sort((a, b) => 
          new Date(b.dateFrom) - new Date(a.dateFrom)
        );
        
        setBookings(sortedBookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setIsLoading(true);
      await deleteBooking(bookingId);
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div>Please log in to view your bookings</div>;
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  if (bookings.length === 0) {
    return (
      <EmptyState>
        <p>You haven't made any bookings yet.</p>
        <p>Start exploring venues to plan your next stay!</p>
      </EmptyState>
    );
  }

  return (
    <BookingsContainer>
      {bookings.map(booking => (
        <BookingCard key={booking.id}>
          <BookingHeader>
            <h3>{booking.venue.name}</h3>
            <span className="status">
              {new Date(booking.dateTo) < new Date() ? 'Past' : 'Upcoming'}
            </span>
          </BookingHeader>
          
          <BookingDetails>
            <DetailItem>
              <FiCalendar />
              <span>
                {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
              </span>
            </DetailItem>
            
            <DetailItem>
              <FiUsers />
              <span>{booking.guests} guests</span>
            </DetailItem>
            
            <DetailItem>
              <FiMapPin />
              <span>
                {booking.venue.location.city}, {booking.venue.location.country}
              </span>
            </DetailItem>
            
            <DetailItem className="price">
              <span>Total:</span>
              <strong>
                ${booking.venue.price * 
                  Math.ceil(
                    (new Date(booking.dateTo) - new Date(booking.dateFrom)) / 
                    (1000 * 60 * 60 * 24)
                  )}
              </strong>
            </DetailItem>
          </BookingDetails>

          {new Date(booking.dateFrom) > new Date() && (
            <BookingActions>
              <DeleteButton 
                onClick={() => handleDeleteBooking(booking.id)}
                disabled={isLoading}
              >
                <FiTrash2 /> Cancel Booking
              </DeleteButton>
            </BookingActions>
          )}
        </BookingCard>
      ))}
    </BookingsContainer>
  );
}

export default BookingsList; 