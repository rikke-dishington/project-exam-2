import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/fa';
import {
  Modal,
  ModalContent,
  Title,
  Message,
  ButtonGroup,
  CancelButton,
  DeleteButton
} from './styles';
import { useState } from 'react';

/**
 * VenueDeleteModal Component
 * 
 * A confirmation modal for deleting venues. Provides clear warning message
 * and requires explicit confirmation before deletion.
 * 
 * Features:
 * - Clear warning message with venue name
 * - Explicit confirmation required
 * - Loading state during deletion
 * - Error handling
 * - Accessible UI elements
 * - Click outside to dismiss
 * - Visual warning icon
 * 
 * @component
 * @example
 * ```jsx
 * <VenueDeleteModal
 *   venueName="Beach House"
 *   onClose={() => setIsModalOpen(false)}
 *   onConfirm={async () => {
 *     await deleteVenue(venueId);
 *     refreshVenues();
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.venueName - Name of the venue to be deleted
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Function} props.onConfirm - Async callback when deletion is confirmed
 */
function VenueDeleteModal({ venueName, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handles the confirmation of venue deletion
   * Manages loading state and error handling
   */
  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal onClick={onClose} role="dialog" aria-label="Delete venue confirmation">
      <ModalContent onClick={e => e.stopPropagation()}>
        <FaExclamationTriangle 
          size={48} 
          color="#dc3545" 
          aria-hidden="true"
          role="img"
        />
        <Title>Delete Venue</Title>
        <Message>
          Are you sure you want to delete "{venueName}"? This action cannot be undone.
        </Message>
        <ButtonGroup>
          <CancelButton 
            onClick={onClose} 
            disabled={isDeleting}
            aria-label="Cancel deletion"
          >
            Cancel
          </CancelButton>
          <DeleteButton 
            onClick={handleConfirm} 
            disabled={isDeleting}
            aria-label={isDeleting ? 'Deleting venue...' : 'Confirm venue deletion'}
            aria-busy={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Venue'}
          </DeleteButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

VenueDeleteModal.propTypes = {
  venueName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default VenueDeleteModal; 