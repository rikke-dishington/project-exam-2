import { FaCalendar } from 'react-icons/fa';
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
  return (
    <Section>
      <SectionHeader $past={isPast}>
        <h2>{title}</h2>
      </SectionHeader>

      {bookings.length === 0 ? (
        <NoBookingsMessage>
          <p>No {isPast ? 'past' : 'upcoming'} bookings</p>
        </NoBookingsMessage>
      ) : (
        <BookingsList>
          {bookings.map(booking => (
            <BookingCard
              key={booking.id}
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

export default BookingSection; 