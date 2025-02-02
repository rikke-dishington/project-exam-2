import PropTypes from 'prop-types';
import { FaCalendar, FaEdit, FaTrash } from 'react-icons/fa';
import {
  Card,
  VenueImage,
  VenueDetails,
  ActionButtons,
  IconButton
} from './styles';

/**
 * ManageVenueCard Component
 * 
 * A card component for managing individual venues in the venue management interface.
 * Displays venue information and provides actions for viewing bookings, editing, and deleting the venue.
 * 
 * Features:
 * - Displays venue image with fallback
 * - Shows venue name and location
 * - Displays price per night
 * - Provides action buttons for:
 *   - Viewing bookings
 *   - Editing venue details
 *   - Deleting venue
 * - Hover effects for better UX
 * - Accessible buttons with icons
 * - Responsive design
 * 
 * @component
 * @example
 * ```jsx
 * <ManageVenueCard
 *   venue={{
 *     id: '123',
 *     name: 'Beach House',
 *     price: 100,
 *     location: { city: 'Miami', country: 'USA' },
 *     media: [{ url: 'image.jpg', alt: 'Beach house' }]
 *   }}
 *   onEdit={(venue) => handleEdit(venue)}
 *   onDelete={(venue) => handleDelete(venue)}
 *   onViewBookings={(venue) => handleViewBookings(venue)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.venue - The venue object containing all venue details
 * @param {string} props.venue.name - Name of the venue
 * @param {number} props.venue.price - Price per night
 * @param {Object} props.venue.location - Location information
 * @param {string} props.venue.location.city - City where the venue is located
 * @param {string} props.venue.location.country - Country where the venue is located
 * @param {Array<Object>} [props.venue.media] - Array of media objects for the venue
 * @param {Function} props.onEdit - Callback function when edit button is clicked
 * @param {Function} props.onDelete - Callback function when delete button is clicked
 * @param {Function} props.onViewBookings - Callback function when view bookings button is clicked
 */
function ManageVenueCard({ venue, onEdit, onDelete, onViewBookings }) {
  return (
    <Card>
      <VenueImage>
        {venue.media?.[0] ? (
          <img src={venue.media[0].url} alt={venue.media[0].alt} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </VenueImage>
      <VenueDetails>
        <h3>{venue.name}</h3>
        <p>{venue.location.city}, {venue.location.country}</p>
        <p className="price">
          <span className="amount">${venue.price}</span>
          <span className="label"> per night</span>
        </p>
      </VenueDetails>
      <ActionButtons>
        <IconButton 
          onClick={() => onViewBookings(venue)} 
          title="View Bookings"
          aria-label={`View bookings for ${venue.name}`}
        >
          <FaCalendar aria-hidden="true" /> Bookings
        </IconButton>
        <IconButton 
          onClick={() => onEdit(venue)} 
          title="Edit Venue"
          aria-label={`Edit ${venue.name}`}
        >
          <FaEdit aria-hidden="true" /> Edit
        </IconButton>
        <IconButton 
          onClick={() => onDelete(venue)} 
          title="Delete Venue" 
          $danger
          aria-label={`Delete ${venue.name}`}
        >
          <FaTrash aria-hidden="true" /> Delete
        </IconButton>
      </ActionButtons>
    </Card>
  );
}

ManageVenueCard.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired
    }).isRequired,
    media: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    }))
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onViewBookings: PropTypes.func.isRequired
};

export default ManageVenueCard; 