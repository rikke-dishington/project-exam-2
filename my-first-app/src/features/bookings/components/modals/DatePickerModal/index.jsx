import { FaTimes } from 'react-icons/fa';
import Calendar from '../../../../../components/common/Calendar';
import {
  Modal,
  ModalContent,
  Header,
  CloseButton,
  CalendarWrapper,
  ButtonGroup,
  CancelButton,
  ApplyButton
} from './styles';

function DatePickerModal({ 
  isOpen, 
  onClose, 
  onApply, 
  venue,
  startDate,
  endDate,
  onDateSelect,
  error
}) {
  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Select Dates</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </Header>

        <CalendarWrapper>
          <Calendar 
            venue={venue}
            onDateSelect={onDateSelect}
            disabledDates={venue.bookings || []}
            error={error}
            startDate={startDate}
            endDate={endDate}
            sideBySide={true}
          />
        </CalendarWrapper>

        <ButtonGroup>
          <CancelButton onClick={onClose}>
            Cancel
          </CancelButton>
          <ApplyButton 
            onClick={onApply}
            disabled={!startDate || !endDate}
          >
            Apply
          </ApplyButton>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
}

export default DatePickerModal; 