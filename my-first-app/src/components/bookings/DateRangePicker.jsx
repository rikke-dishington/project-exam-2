import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWrapper } from './DateRangePicker.styles';

const DateRangePicker = ({ 
  startDate, 
  endDate, 
  onChange, 
  minDate = new Date(),
  placeholderText = "Select dates",
  ...props 
}) => {
  return (
    <DatePickerWrapper>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        selectsRange
        monthsShown={2}
        placeholderText={placeholderText}
        dateFormat="MMM d, yyyy"
        {...props}
      />
    </DatePickerWrapper>
  );
};

export default DateRangePicker; 