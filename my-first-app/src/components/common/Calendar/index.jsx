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

  // Generate all dates between two dates
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Get all booked dates from venue bookings
  const getAllBookedDates = () => {
    if (!venue.bookings || !Array.isArray(venue.bookings)) return [];

    return venue.bookings.reduce((dates, booking) => {
      const bookingDates = getDatesBetween(
        new Date(booking.dateFrom),
        new Date(booking.dateTo)
      );
      return [...dates, ...bookingDates];
    }, []);
  };

  const excludedDates = getAllBookedDates();

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