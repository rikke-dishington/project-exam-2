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

function DeleteConfirmModal({ venueName, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <FaExclamationTriangle size={48} color="#dc3545" />
        <Title>Delete Venue</Title>
        <Message>
          Are you sure you want to delete "{venueName}"? This action cannot be undone.
        </Message>
        <ButtonGroup>
          <CancelButton onClick={onClose} disabled={isDeleting}>Cancel</CancelButton>
          <DeleteButton onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete Venue'}
          </DeleteButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmModal; 