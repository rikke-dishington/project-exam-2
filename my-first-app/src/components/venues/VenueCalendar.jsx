import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  .react-datepicker {
    font-family: inherit;
    border: none;
    width: 100%;
  }

  .react-datepicker__month-container {
    float: left;
    width: 50%;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0.5rem;
  }
`;

const VenueCalendar = ({ onDateSelect }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates[0] && dates[1]) {
      onDateSelect(dates);
    }
  };

  return (
    <CalendarWrapper>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={2}
      />
    </CalendarWrapper>
  );
};

export default VenueCalendar; 