import { useState, useEffect } from 'react';
import { Container, BookingsHeader, BookingsList } from './bookings.styles';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <BookingsHeader>
        <h1>My Bookings</h1>
      </BookingsHeader>
      <BookingsList>
        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          bookings.map(booking => (
            <div key={booking.id}>
              {/* TODO: Add booking details */}
            </div>
          ))
        )}
      </BookingsList>
    </Container>
  );
}

export default Bookings; 