import React from 'react';
import {
  Popup,
  ButtonContainer,
  SaveButton,
  CancelButton,
  DateInputContainer,
  DateInput,
  Label
} from './DateSelector.styles';

const DateSelector = ({ startDate, endDate, onChange, onClose }) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value ? new Date(e.target.value) : null;
    onChange([newStartDate, endDate]);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value ? new Date(e.target.value) : null;
    onChange([startDate, newEndDate]);
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Popup>
      <DateInputContainer>
        <div>
          <Label>Check-in</Label>
          <DateInput
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            min={today}
          />
        </div>
        <div>
          <Label>Check-out</Label>
          <DateInput
            type="date"
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
            min={startDate ? formatDateForInput(startDate) : today}
          />
        </div>
      </DateInputContainer>
      <ButtonContainer>
        <SaveButton 
          type="button"
          onClick={onClose}
          disabled={!startDate || !endDate}
        >
          Save
        </SaveButton>
        <CancelButton 
          type="button"
          onClick={onClose}
        >
          Cancel
        </CancelButton>
      </ButtonContainer>
    </Popup>
  );
};

export default DateSelector; 