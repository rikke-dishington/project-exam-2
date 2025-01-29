import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaTimes } from 'react-icons/fa';
import { useUser } from '../../../context/UserContext';
import {
  CalendarWrapper,
  CalendarModal,
  CalendarOverlay,
  ModalHeader,
  CloseButton,
  DatePickerButton,
  ErrorMessage,
  ButtonGroup,
  Button
} from './styles';

function Calendar({ venue, onDateSelect, disabledDates = [], error, startDate, endDate }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setTempStartDate(start);
    setTempEndDate(end);
  };

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      onDateSelect(tempStartDate, tempEndDate);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (!startDate || !endDate) return 'Select dates';
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  const bookedDates = disabledDates.reduce((dates, booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    const date = new Date(start);

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }, []);

  return (
    <CalendarWrapper>
      <DatePickerButton onClick={() => setIsOpen(true)}>
        <span>{formatDateRange()}</span>
        <FaCalendar />
      </DatePickerButton>

      {isOpen && (
        <CalendarOverlay onClick={handleCancel}>
          <CalendarModal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h3>Select Dates</h3>
              <CloseButton onClick={handleCancel}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            <DatePicker
              selected={tempStartDate}
              onChange={handleDateChange}
              startDate={tempStartDate}
              endDate={tempEndDate}
              selectsRange
              inline
              minDate={new Date()}
              excludeDates={bookedDates}
              monthsShown={2}
              showDisabledMonthNavigation
              calendarClassName="side-by-side"
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonGroup>
              <Button onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
              <Button 
                onClick={handleApply}
                disabled={!tempStartDate || !tempEndDate}
                variant="primary"
              >
                Apply
              </Button>
            </ButtonGroup>
          </CalendarModal>
        </CalendarOverlay>
      )}
    </CalendarWrapper>
  );
}

export default Calendar; 