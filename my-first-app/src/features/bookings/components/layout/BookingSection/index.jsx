import PropTypes from 'prop-types';
import BookingCard from '../BookingCard';
import {
  Section,
  SectionHeader,
  BookingsList,
  NoBookingsMessage
} from './styles';

/**
 * BookingSection Component
 * 
 * A section component that displays a list of bookings, either upcoming or past.
 * Handles the layout and organization of booking cards with appropriate messaging
 * when no bookings are present.
 * 
 * Features:
 * - Displays a list of booking cards
 * - Shows empty state message when no bookings exist
 * - Handles both upcoming and past bookings
 * - Provides edit and delete functionality for bookings
 * - Validates booking data before display
 * - Responsive grid layout
 * 
 * @component
 * @example
 * ```jsx
 * <BookingSection
 *   title="Upcoming Bookings"
 *   bookings={[
 *     {
 *       id: '123',
 *       venue: {
 *         name: 'Beach House',
 *         media: [{ url: 'image.jpg', alt: 'Beach house' }],
 *         location: { city: 'Miami', country: 'USA' }
 *       },
 *       dateFrom: '2024-02-01',
 *       dateTo: '2024-02-05',
 *       guests: 2
 *     }
 *   ]}
 *   isPast={false}
 *   onEdit={(booking) => handleEdit(booking)}
 *   onDelete={(booking) => handleDelete(booking)}
 *   isDeleting={false}
 *   formatDate={(date) => new Date(date).toLocaleDateString()}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {Array} props.bookings - Array of booking objects to display
 * @param {boolean} [props.isPast=false] - Whether this section displays past bookings
 * @param {Function} props.onEdit - Callback when edit button is clicked
 * @param {Function} props.onDelete - Callback when delete button is clicked
 * @param {boolean} props.isDeleting - Whether a delete operation is in progress
 * @param {Function} props.formatDate - Function to format date strings
 */
function BookingSection({ 
  title, 
  bookings = [], 
  isPast = false,
  onEdit,
  onDelete,
  isDeleting,
  formatDate
}) {
  // Filter out bookings with invalid IDs
  const validBookings = bookings.filter(booking => booking.id);

  return (
    <Section>
      <SectionHeader $past={isPast}>
        <h2>{title}</h2>
      </SectionHeader>

      {validBookings.length === 0 ? (
        <NoBookingsMessage>
          <p>No {isPast ? 'past' : 'upcoming'} bookings</p>
        </NoBookingsMessage>
      ) : (
        <BookingsList>
          {validBookings.map(booking => (
            <BookingCard
              key={`booking-${booking.id}`}
              booking={booking}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
              formatDate={formatDate}
            />
          ))}
        </BookingsList>
      )}
    </Section>
  );
}

BookingSection.propTypes = {
  title: PropTypes.string.isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        media: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
            alt: PropTypes.string
          })
        ),
        location: PropTypes.shape({
          city: PropTypes.string,
          country: PropTypes.string
        })
      }).isRequired,
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired
    })
  ),
  isPast: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  formatDate: PropTypes.func.isRequired
};

BookingSection.defaultProps = {
  bookings: [],
  isPast: false
};

export default BookingSection; 