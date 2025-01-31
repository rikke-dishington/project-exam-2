import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { profilesApi } from '../../utils/api/profiles';
import { FaCalendar, FaMapMarkerAlt, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { bookingApi } from '../../utils/api/bookings';
import EditBookingModal from '../../components/bookings/EditBookingModal';
import {
  Container,
  BookingsHeader,
  BookingsList,
  BookingCard,
  ImageSection,
  BookingInfo,
  DateRange,
  GuestInfo,
  VenueInfo,
  VenueName,
  Location,
  LoadingSpinner,
  ErrorMessage,
  NoBookingsMessage,
  ActionButtons,
  EditButton,
  DeleteButton
} from './index.styles';

function Bookings() {
  const { name } = useParams();
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await profilesApi.getBookings(name);

        const bookingsData = Array.isArray(response) ? response : response.data;
        
        if (!Array.isArray(bookingsData)) {
          throw new Error('Invalid bookings data received');
        }

        const now = new Date();
        
        const upcomingBookings = bookingsData
          .filter(booking => new Date(booking.dateFrom) >= now)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
          
        const pastBookings = bookingsData
          .filter(booking => new Date(booking.dateFrom) < now)
          .sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));
          
        setBookings({ upcoming: upcomingBookings, past: pastBookings });

      } catch (err) {
        setError(err.message || 'Failed to load bookings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [name]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setIsDeleting(true);
      try {
        await bookingApi.delete(bookingId);
        const response = await profilesApi.getBookings(name);
        const bookingsData = Array.isArray(response) ? response : response.data;
        
        if (!Array.isArray(bookingsData)) {
          throw new Error('Invalid bookings data received');
        }

        const now = new Date();
        
        const upcomingBookings = bookingsData
          .filter(booking => new Date(booking.dateFrom) >= now)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
          
        const pastBookings = bookingsData
          .filter(booking => new Date(booking.dateFrom) < now)
          .sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom)); // Most recent past first
          
        setBookings({ upcoming: upcomingBookings, past: pastBookings });

      } catch (error) {
        setError('Failed to cancel booking');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdate = async () => {
    const response = await profilesApi.getBookings(name);
    const bookingsData = Array.isArray(response) ? response : response.data;
    
    if (!Array.isArray(bookingsData)) {
      throw new Error('Invalid bookings data received');
    }

    const now = new Date();
    
    const upcomingBookings = bookingsData
      .filter(booking => new Date(booking.dateFrom) >= now)
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
      
    const pastBookings = bookingsData
      .filter(booking => new Date(booking.dateFrom) < now)
      .sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));
      
    setBookings({ upcoming: upcomingBookings, past: pastBookings });
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner>
          <FaCalendar />
          <span>Loading your bookings...</span>
        </LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {bookings.upcoming.length === 0 && bookings.past.length === 0 ? (
        <NoBookingsMessage>
          <FaCalendar />
          <h3>No bookings yet</h3>
          <p>When you book a venue, it will appear here</p>
        </NoBookingsMessage>
      ) : (
        <>
          <BookingsHeader>
            <h2>My Upcoming Bookings</h2>
          </BookingsHeader>
          {bookings.upcoming.length === 0 ? (
            <NoBookingsMessage>
              <p>No upcoming bookings</p>
            </NoBookingsMessage>
          ) : (
            <BookingsList>
              {bookings.upcoming.map(booking => {
                const venue = {
                  name: booking?.venue?.name || 'Unknown Venue',
                  media: booking?.venue?.media || [],
                  location: {
                    city: booking?.venue?.location?.city || 'Unknown City',
                    country: booking?.venue?.location?.country || ''
                  }
                };
                
                return (
                  <BookingCard key={booking.id}>
                    <ImageSection>
                      {venue.media[0] ? (
                        <img 
                          src={venue.media[0].url} 
                          alt={venue.name} 
                        />
                      ) : (
                        <div className="placeholder">No Image</div>
                      )}
                    </ImageSection>
                    
                    <BookingInfo>
                      <VenueInfo>
                        <VenueName>{venue.name}</VenueName>
                        <Location>
                          <FaMapMarkerAlt />
                          <span>
                            {venue.location.city}
                            {venue.location.country && `, ${venue.location.country}`}
                          </span>
                        </Location>
                      </VenueInfo>

                      <DateRange>
                        <div>
                          <strong>Check-in:</strong> {formatDate(booking.dateFrom)}
                        </div>
                        <div>
                          <strong>Check-out:</strong> {formatDate(booking.dateTo)}
                        </div>
                      </DateRange>

                      <GuestInfo>
                        <FaUser />
                        <span>{booking.guests} guests</span>
                      </GuestInfo>

                      <ActionButtons>
                        {new Date(booking.dateFrom) > new Date() && (
                          <>
                            <EditButton 
                              onClick={() => handleEdit(booking)}
                              disabled={isDeleting}
                            >
                              <FaEdit /> Edit
                            </EditButton>
                            <DeleteButton 
                              onClick={() => handleDelete(booking.id)}
                              disabled={isDeleting}
                            >
                              <FaTrash /> Cancel
                            </DeleteButton>
                          </>
                        )}
                      </ActionButtons>
                    </BookingInfo>
                  </BookingCard>
                );
              })}
            </BookingsList>
          )}

          <BookingsHeader $past>
            <h2>My Past Bookings</h2>
          </BookingsHeader>
          {bookings.past.length === 0 ? (
            <NoBookingsMessage>
              <p>No past bookings</p>
            </NoBookingsMessage>
          ) : (
            <BookingsList>
              {bookings.past.map(booking => {
                const venue = {
                  name: booking?.venue?.name || 'Unknown Venue',
                  media: booking?.venue?.media || [],
                  location: {
                    city: booking?.venue?.location?.city || 'Unknown City',
                    country: booking?.venue?.location?.country || ''
                  }
                };
                
                return (
                  <BookingCard key={booking.id}>
                    <ImageSection>
                      {venue.media[0] ? (
                        <img 
                          src={venue.media[0].url} 
                          alt={venue.name} 
                        />
                      ) : (
                        <div className="placeholder">No Image</div>
                      )}
                    </ImageSection>
                    
                    <BookingInfo>
                      <VenueInfo>
                        <VenueName>{venue.name}</VenueName>
                        <Location>
                          <FaMapMarkerAlt />
                          <span>
                            {venue.location.city}
                            {venue.location.country && `, ${venue.location.country}`}
                          </span>
                        </Location>
                      </VenueInfo>

                      <DateRange>
                        <div>
                          <strong>Check-in:</strong> {formatDate(booking.dateFrom)}
                        </div>
                        <div>
                          <strong>Check-out:</strong> {formatDate(booking.dateTo)}
                        </div>
                      </DateRange>

                      <GuestInfo>
                        <FaUser />
                        <span>{booking.guests} guests</span>
                      </GuestInfo>

                      <ActionButtons>
                        {new Date(booking.dateFrom) > new Date() && (
                          <>
                            <EditButton 
                              onClick={() => handleEdit(booking)}
                              disabled={isDeleting}
                            >
                              <FaEdit /> Edit
                            </EditButton>
                            <DeleteButton 
                              onClick={() => handleDelete(booking.id)}
                              disabled={isDeleting}
                            >
                              <FaTrash /> Cancel
                            </DeleteButton>
                          </>
                        )}
                      </ActionButtons>
                    </BookingInfo>
                  </BookingCard>
                );
              })}
            </BookingsList>
          )}
        </>
      )}
      {isEditModalOpen && selectedBooking && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBooking(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </Container>
  );
}

export default Bookings; 