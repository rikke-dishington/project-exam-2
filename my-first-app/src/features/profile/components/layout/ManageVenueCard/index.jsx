import { FaCalendar, FaEdit, FaTrash } from 'react-icons/fa';
import {
  Card,
  VenueImage,
  VenueDetails,
  ActionButtons,
  IconButton
} from './styles';

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
        <p className="price">Price per night: ${venue.price}</p>
      </VenueDetails>
      <ActionButtons>
        <IconButton onClick={() => onViewBookings(venue)} title="View Bookings">
          <FaCalendar />
        </IconButton>
        <IconButton onClick={() => onEdit(venue)} title="Edit Venue">
          <FaEdit />
        </IconButton>
        <IconButton onClick={() => onDelete(venue)} title="Delete Venue" $danger>
          <FaTrash />
        </IconButton>
      </ActionButtons>
    </Card>
  );
}

export default ManageVenueCard; 