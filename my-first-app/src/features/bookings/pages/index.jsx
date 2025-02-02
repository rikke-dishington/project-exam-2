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

/**
 * Bookings Page Component
 * 
 * Main page component for displaying and managing a user's bookings.
 * Separates bookings into upcoming and past sections, provides editing
 * and cancellation functionality, and handles all booking-related operations.
 * 
 * Features:
 * - Fetches and displays user's bookings
 * - Separates bookings into upcoming and past
 * - Provides booking management (edit/cancel)
 * - Handles loading and error states
 * - Real-time booking updates
 * - Responsive layout
 * - Empty state handling
 * 
 * URL Parameters:
 * - name: Username of the profile to display bookings for
 * 
 * State Management:
 * - Manages booking data with separate upcoming/past arrays
 * - Handles loading and error states
 * - Manages modal states for editing and deletion
 * - Tracks selected booking for operations
 * 
 * @component
 * @example
 * ```jsx
 * // In your router configuration
 * <Route path="/profiles/:name/bookings" element={<Bookings />} />
 * ```
 */
function Bookings() {
  const { name } = useParams();
  const [bookings, setBookings] = useState({ upcoming: [], past: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Processes raw booking data to ensure consistent format
   * Handles missing data and converts types where needed
   * 
   * @param {Object} booking - Raw booking data from API
   * @returns {Object} Processed booking data with consistent format
   */
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

  /**
   * Fetches and processes bookings data
   * Separates bookings into upcoming and past based on dates
   * Updates state with processed data
   */
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

  /**
   * Handles initiating the edit process for a booking
   * Opens the edit modal with the selected booking
   * 
   * @param {Object} booking - The booking to edit
   */
  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  /**
   * Handles initiating the delete process for a booking
   * Opens the delete confirmation modal
   * 
   * @param {Object} booking - The booking to delete
   */
  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  /**
   * Handles the confirmation of booking deletion
   * Processes the deletion and updates the booking list
   * 
   * @param {string} bookingId - ID of the booking to delete
   */
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

  /**
   * Updates the bookings list after a successful edit
   * Refetches and reprocesses all bookings
   */
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