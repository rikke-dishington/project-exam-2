import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import {
  CalendarWrapper,
  Label,
  ErrorMessage
} from './styles';

function Calendar({ 
  venue,
  onDateSelect,
  disabledDates = [],
  error,
  startDate,
  endDate
}) {
  const [selectedDates, setSelectedDates] = useState({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null
  });

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedDates({
        start: new Date(startDate),
        end: new Date(endDate)
      });
    }
  }, [startDate, endDate]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedDates({ start, end });
    if (start && end) {
      onDateSelect(start, end);
    }
  };

  const excludedDates = disabledDates.map(date => new Date(date));

  return (
    <CalendarWrapper>
      <Label>
        <FaCalendar />
        Select Dates
      </Label>
      <DatePicker
        selected={selectedDates.start}
        onChange={handleDateChange}
        startDate={selectedDates.start}
        endDate={selectedDates.end}
        excludeDates={excludedDates}
        selectsRange
        inline
        minDate={new Date()}
        monthsShown={2}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CalendarWrapper>
  );
}

export default Calendar; 