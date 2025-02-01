import PropTypes from 'prop-types';
import BookingCard from '../BookingCard';
import {
  Section,
  SectionHeader,
  BookingsList,
  NoBookingsMessage
} from './styles';

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