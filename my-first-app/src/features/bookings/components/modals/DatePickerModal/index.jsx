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

/**
 * DatePickerModal Component
 * 
 * A modal component that displays a calendar for selecting booking dates.
 * Provides a full-screen overlay with a calendar interface for date range selection.
 * 
 * Features:
 * - Date range selection with calendar
 * - Disabled dates based on existing bookings
 * - Error state handling
 * - Side-by-side month view
 * - Apply/Cancel actions
 * - Click outside to close
 * - Responsive design
 * 
 * @component
 * @example
 * ```jsx
 * <DatePickerModal
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   onApply={() => handleDateSelection()}
 *   venue={{
 *     id: '123',
 *     bookings: [
 *       { dateFrom: '2024-01-01', dateTo: '2024-01-05' }
 *     ]
 *   }}
 *   startDate={new Date('2024-02-01')}
 *   endDate={new Date('2024-02-05')}
 *   onDateSelect={(start, end) => handleDateSelect(start, end)}
 *   error={null}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Function} props.onApply - Callback when dates are applied
 * @param {Object} props.venue - Venue object containing booking information
 * @param {Array} props.venue.bookings - Array of existing bookings to disable dates
 * @param {Date|string} [props.startDate] - Selected start date
 * @param {Date|string} [props.endDate] - Selected end date
 * @param {Function} props.onDateSelect - Callback when dates are selected
 * @param {string} [props.error] - Error message to display
 */
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
    <Modal onClick={onClose} role="dialog" aria-label="Select booking dates">
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Select Dates</h2>
          <CloseButton onClick={onClose} aria-label="Close date picker">
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