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

function BookingCard({ booking, onEdit, onDelete, isDeleting, formatDate }) {
  const venue = {
    name: booking?.venue?.name || 'Unknown Venue',
    media: booking?.venue?.media || [],
    location: {
      city: booking?.venue?.location?.city || 'Unknown City',
      country: booking?.venue?.location?.country || ''
    }
  };

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
              >
                <FaEdit /> Edit
              </EditButton>
              <DeleteButton 
                onClick={() => onDelete(booking.id)}
                disabled={isDeleting}
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