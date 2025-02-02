import { FaMinus, FaPlus, FaUser } from 'react-icons/fa';
import {
  GuestSelectorWrapper,
  GuestCount,
  GuestButton,
  GuestInfo,
  GuestControls
} from './styles';

/**
 * GuestSelector Component
 * 
 * A counter component for selecting the number of guests for a booking.
 * Provides an intuitive interface with increment/decrement controls and
 * enforces minimum and maximum guest limits.
 * 
 * Features:
 * - Increment/decrement controls
 * - Visual feedback for min/max limits
 * - Disabled state handling
 * - Numeric value validation
 * - Responsive design with icons
 * 
 * @component
 * @example
 * ```jsx
 * <GuestSelector
 *   value={2}
 *   onChange={(newValue) => console.log('New guest count:', newValue)}
 *   maxGuests={4}
 *   disabled={false}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current number of guests selected
 * @param {Function} props.onChange - Callback function when guest count changes
 * @param {number} props.maxGuests - Maximum number of guests allowed
 * @param {boolean} [props.disabled] - Whether the selector is disabled
 */
function GuestSelector({ value, onChange, maxGuests, disabled }) {

  /**
   * Handles decreasing the guest count
   * Prevents decreasing below 1 guest
   * Respects disabled state
   */
  const handleDecrease = () => {
    if (disabled) return;
    if (value > 1) {
      onChange(value - 1);
    }
  };

  /**
   * Handles increasing the guest count
   * Prevents exceeding maxGuests limit
   * Respects disabled state
   */
  const handleIncrease = () => {
    if (disabled) return;
    if (value < maxGuests) {
      onChange(value + 1);
    }
  };

  // Ensure numeric values and fallback to defaults
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
          aria-label="Decrease guest count"
        >
          <FaMinus />
        </GuestButton>
        <GuestCount>{numericValue}</GuestCount>
        <GuestButton 
          onClick={handleIncrease} 
          disabled={disabled || numericValue >= numericMaxGuests}
          aria-label="Increase guest count"
        >
          <FaPlus />
        </GuestButton>
      </GuestControls>
    </GuestSelectorWrapper>
  );
}

export default GuestSelector; 