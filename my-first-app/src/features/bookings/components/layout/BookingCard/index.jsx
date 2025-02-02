import { FaMapMarkerAlt, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import BookingImage from '../../display/BookingImage';
import {
  Card,
  BookingInfo,
  VenueInfo,
  VenueName,
  Location,
  DateRange,
  GuestInfo,
  ActionButtons,
  EditButton,
  DeleteButton
} from './styles';

/**
 * BookingCard Component
 * 
 * A card component that displays detailed information about a single booking.
 * Shows venue details, booking dates, guest count, and provides actions for
 * managing the booking.
 * 
 * Features:
 * - Displays venue image with fallback
 * - Shows venue name and location
 * - Displays booking dates
 * - Shows guest count
 * - Provides edit and cancel actions for upcoming bookings
 * - Handles loading states during actions
 * - Gracefully handles missing data
 * - Responsive design
 * 
 * @component
 * @example
 * ```jsx
 * <BookingCard
 *   booking={{
 *     id: '123',
 *     venue: {
 *       name: 'Beach House',
 *       media: [{ url: 'image.jpg', alt: 'Beach house' }],
 *       location: { city: 'Miami', country: 'USA' }
 *     },
 *     dateFrom: '2024-02-01',
 *     dateTo: '2024-02-05',
 *     guests: 2
 *   }}
 *   onEdit={(booking) => handleEdit(booking)}
 *   onDelete={(booking) => handleDelete(booking)}
 *   isDeleting={false}
 *   formatDate={(date) => new Date(date).toLocaleDateString()}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.booking - The booking object to display
 * @param {Object} props.booking.venue - Venue information
 * @param {string} props.booking.venue.name - Name of the venue
 * @param {Array} props.booking.venue.media - Array of venue images
 * @param {Object} props.booking.venue.location - Venue location
 * @param {string} props.booking.dateFrom - Check-in date
 * @param {string} props.booking.dateTo - Check-out date
 * @param {number} props.booking.guests - Number of guests
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 * @param {boolean} props.isDeleting - Whether a delete operation is in progress
 * @param {Function} props.formatDate - Function to format date strings
 */
function BookingCard({ booking, onEdit, onDelete, isDeleting, formatDate }) {
  // Ensure venue data with fallbacks
  const venue = {
    name: booking?.venue?.name || 'Unknown Venue',
    media: booking?.venue?.media || [],
    location: {
      city: booking?.venue?.location?.city || 'Unknown City',
      country: booking?.venue?.location?.country || ''
    }
  };

  // Determine if booking is upcoming for action button display
  const isUpcoming = new Date(booking.dateFrom) > new Date();

  return (
    <Card>
      <BookingImage media={venue.media} venueName={venue.name} />
      
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
          {isUpcoming && (
            <>
              <EditButton 
                onClick={() => onEdit(booking)}
                disabled={isDeleting}
                aria-label="Edit booking"
              >
                <FaEdit /> Edit
              </EditButton>
              <DeleteButton 
                onClick={() => onDelete(booking)}
                disabled={isDeleting}
                aria-label="Cancel booking"
              >
                <FaTrash /> Cancel
              </DeleteButton>
            </>
          )}
        </ActionButtons>
      </BookingInfo>
    </Card>
  );
}

export default BookingCard; 