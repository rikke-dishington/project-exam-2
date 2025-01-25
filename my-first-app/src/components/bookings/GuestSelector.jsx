import React, { useState } from 'react';
import {
  Popup,
  GuestCounter,
  Label,
  Controls,
  CounterButton,
  Count,
  ButtonContainer,
  SaveButton,
  CancelButton
} from './GuestSelector.styles';

const GuestSelector = ({ guests, maxGuests, onChange, onClose }) => {
  const [localGuests, setLocalGuests] = useState(guests);

  const handleSave = (e) => {
    e.preventDefault();
    onChange(localGuests);
    onClose();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    setLocalGuests(prev => Math.min(maxGuests, prev + 1));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    setLocalGuests(prev => Math.max(1, prev - 1));
  };

  return (
    <Popup>
      <GuestCounter>
        <Label>Guests</Label>
        <Controls>
          <CounterButton 
            type="button"
            onClick={handleDecrement}
            disabled={localGuests <= 1}
          >
            -
          </CounterButton>
          <Count>{localGuests}</Count>
          <CounterButton 
            type="button"
            onClick={handleIncrement}
            disabled={localGuests >= maxGuests}
          >
            +
          </CounterButton>
        </Controls>
      </GuestCounter>
      <ButtonContainer>
        <SaveButton 
          type="button"
          onClick={handleSave}
        >
          Save
        </SaveButton>
        <CancelButton 
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </CancelButton>
      </ButtonContainer>
    </Popup>
  );
};

export default GuestSelector; 