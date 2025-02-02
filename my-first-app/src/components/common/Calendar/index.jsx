import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import {
  CalendarWrapper,
  Label,
  ErrorMessage
} from './styles';

/**
 * Calendar Component
 * 
 * A date range picker component specifically designed for venue booking.
 * Handles date selection, booking availability, and date range validation.
 * 
 * Features:
 * - Date range selection
 * - Booking availability check
 * - Disabled dates handling
 * - Error state display
 * - Visual date picker
 * - Two-month display
 * 
 * Props:
 * @param {Object} venue - Venue object containing booking information
 * @param {Function} onDateSelect - Callback function for date selection (start, end)
 * @param {Array} disabledDates - Array of dates to disable in the calendar
 * @param {string} error - Error message to display
 * @param {string|Date} startDate - Initial start date
 * @param {string|Date} endDate - Initial end date
 * 
 * State:
 * - selectedDates: Object containing selected start and end dates
 * - Automatically updates when props change
 * - Handles date range validation
 * 
 * @example
 * ```jsx
 * <Calendar
 *   venue={venueData}
 *   onDateSelect={(start, end) => handleDateSelection(start, end)}
 *   error={bookingError}
 *   startDate={bookingStart}
 *   endDate={bookingEnd}
 * />
 * ```
 */
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

  /**
   * Handles date range selection
   * Updates local state and calls parent callback
   * @param {Array} dates - Array containing [startDate, endDate]
   */
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedDates({ start, end });
    if (start && end) {
      onDateSelect(start, end);
    }
  };

  /**
   * Generates array of dates between two dates
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Array} Array of dates
   */
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

  /**
   * Gets all booked dates from venue bookings
   * @returns {Array} Array of booked dates
   */
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