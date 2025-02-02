import { FaTimes } from 'react-icons/fa';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  Message,
  ButtonGroup,
  CancelButton,
  DeleteButton
} from './styles';

/**
 * BookingDeleteModal Component
 * 
 * A confirmation modal for canceling bookings. Provides clear messaging about
 * the cancellation action and requires explicit confirmation.
 * 
 * Features:
 * - Clear warning message with venue name
 * - Explicit confirmation required
 * - Loading state during cancellation
 * - Click outside to dismiss
 * - Accessible button states
 * - Responsive design
 * 
 * @component
 * @example
 * ```jsx
 * <BookingDeleteModal
 *   booking={{
 *     id: '123',
 *     venue: {
 *       name: 'Beach House'
 *     }
 *   }}
 *   onClose={() => setIsModalOpen(false)}
 *   onConfirm={(bookingId) => handleCancelBooking(bookingId)}
 *   isDeleting={false}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Object} props.booking - The booking to be cancelled
 * @param {string} props.booking.id - Booking identifier
 * @param {Object} props.booking.venue - Venue information
 * @param {string} props.booking.venue.name - Name of the venue
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Function} props.onConfirm - Callback when cancellation is confirmed
 * @param {boolean} props.isDeleting - Whether cancellation is in progress
 */
function BookingDeleteModal({ booking, onClose, onConfirm, isDeleting }) {
  return (
    <Modal onClick={onClose} role="dialog" aria-label="Cancel booking confirmation">
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Cancel Booking</h2>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </Header>

        <Message>
          <p>Are you sure you want to cancel your booking at <strong>{booking.venue.name}</strong>?</p>
          <p>This action cannot be undone.</p>
        </Message>

        <ButtonGroup>
          <CancelButton 
            type="button" 
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Keep booking"
          >
            Keep Booking
          </CancelButton>
          <DeleteButton 
            type="button"
            onClick={() => onConfirm(booking.id)}
            disabled={isDeleting}
            aria-label={isDeleting ? 'Cancelling booking...' : 'Confirm cancellation'}
          >
            {isDeleting ? 'Cancelling...' : 'Cancel Booking'}
          </DeleteButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

export default BookingDeleteModal; 