import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendar } from 'react-icons/fa';
import { profilesApi } from '../../../features/profile/api/profiles';
import { bookingApi } from '../api/bookings';
import { BookingEditModal } from '../../../features/profile/components';
import { BookingSection, BookingDeleteModal } from '../components';
import {
  Container,
  LoadingSpinner,
  ErrorMessage,
  NoBookingsMessage
} from './styles';

function Bookings() {
  const { name } = useParams();
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const processBookingData = (booking) => {
    if (!booking.id) {
      console.error('Missing booking ID:', booking);
    }

    return {
      ...booking,
      guests: Number(booking.guests) || 1,
      venue: {
        ...booking.venue,
        media: booking.venue.media?.map(media => 
          typeof media === 'string' 
            ? { url: media, alt: booking.venue.name } 
            : media
        ) || []
      }
    };
  };

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
          .map(processBookingData)
          .filter(booking => new Date(booking.dateFrom) >= now)
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
          
        const pastBookings = bookingsData
          .map(processBookingData)
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

  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (bookingId) => {
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
        .map(processBookingData)
        .filter(booking => new Date(booking.dateFrom) >= now)
        .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
        
      const pastBookings = bookingsData
        .map(processBookingData)
        .filter(booking => new Date(booking.dateFrom) < now)
        .sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));
        
      setBookings({ upcoming: upcomingBookings, past: pastBookings });
      setIsDeleteModalOpen(false);
    } catch (error) {
      setError('Failed to cancel booking');
    } finally {
      setIsDeleting(false);
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
      .map(processBookingData)
      .filter(booking => new Date(booking.dateFrom) >= now)
      .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
      
    const pastBookings = bookingsData
      .map(processBookingData)
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
          <BookingSection
            title="My Upcoming Bookings"
            bookings={bookings.upcoming}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            formatDate={formatDate}
          />

          <BookingSection
            title="My Past Bookings"
            bookings={bookings.past}
            isPast
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            formatDate={formatDate}
          />
        </>
      )}

      {isEditModalOpen && selectedBooking && (
        <BookingEditModal
          booking={selectedBooking}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBooking(null);
          }}
          onUpdate={handleUpdate}
        />
      )}

      {isDeleteModalOpen && selectedBooking && (
        <BookingDeleteModal
          booking={selectedBooking}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedBooking(null);
          }}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </Container>
  );
}

export default Bookings; 