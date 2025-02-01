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

function BookingDeleteModal({ booking, onClose, onConfirm, isDeleting }) {
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Cancel Booking</h2>
          <CloseButton onClick={onClose}>
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
          >
            Keep Booking
          </CancelButton>
          <DeleteButton 
            type="button"
            onClick={() => onConfirm(booking.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Cancelling...' : 'Cancel Booking'}
          </DeleteButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

export default BookingDeleteModal; 