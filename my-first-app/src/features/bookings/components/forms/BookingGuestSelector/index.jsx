import { FaMinus, FaPlus, FaUser } from 'react-icons/fa';
import {
  GuestSelectorWrapper,
  GuestCount,
  GuestButton,
  GuestInfo,
  GuestControls
} from './styles';

function GuestSelector({ value, onChange, maxGuests, disabled }) {

  const handleDecrease = () => {
    if (disabled) return;
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (disabled) return;
    if (value < maxGuests) {
      onChange(value + 1);
    }
  };

  const numericValue = Number(value) || 1;
  const numericMaxGuests = Number(maxGuests) || 1;

  return (
    <GuestSelectorWrapper $disabled={disabled}>
      <GuestInfo>
        <FaUser />
        <span>Guests</span>
      </GuestInfo>
      <GuestControls>
        <GuestButton 
          onClick={handleDecrease} 
          disabled={disabled || numericValue <= 1}
        >
          <FaMinus />
        </GuestButton>
        <GuestCount>{numericValue}</GuestCount>
        <GuestButton 
          onClick={handleIncrease} 
          disabled={disabled || numericValue >= numericMaxGuests}
        >
          <FaPlus />
        </GuestButton>
      </GuestControls>
    </GuestSelectorWrapper>
  );
}

export default GuestSelector; 