import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Filters from '../VenueFilters';
import {
  Overlay,
  DrawerContainer,
  DrawerHeader,
  CloseButton,
  DrawerContent,
  DrawerFooter,
  ApplyButton,
  ClearButton,
} from './styles';

/**
 * VenueFilterDrawer Component
 * 
 * A sliding drawer component that contains venue filters. Provides a mobile-friendly
 * interface for managing venue filters with apply and clear functionality.
 * 
 * Features:
 * - Sliding drawer animation
 * - Overlay background
 * - Temporary filter state
 * - Apply and clear actions
 * - Mobile-optimized layout
 * - Accessible controls
 * - Clean and modern UI
 * - Smooth transitions
 * - Default filter values
 * 
 * @component
 * @example
 * ```jsx
 * <VenueFilterDrawer
 *   isOpen={isFilterDrawerOpen}
 *   onClose={() => setIsFilterDrawerOpen(false)}
 *   initialFilters={{
 *     wifi: false,
 *     parking: true,
 *     breakfast: false,
 *     pets: false,
 *     maxPrice: 500
 *   }}
 *   onFilterChange={(filters) => {
 *     setFilters(filters);
 *     applyFilters(filters);
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {Function} props.onClose - Callback when drawer is closed
 * @param {Function} props.onFilterChange - Callback when filters are applied
 * @param {Object} props.initialFilters - Initial filter values
 */
function VenueFilterDrawer({ isOpen, onClose, onFilterChange, initialFilters }) {
  const [tempFilters, setTempFilters] = useState(initialFilters);

  useEffect(() => {
    setTempFilters(initialFilters);
  }, [initialFilters]);

  /**
   * Handles clearing all filters to default values
   * Applies changes and closes drawer
   */
  const handleClear = () => {
    const defaultFilters = {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
      maxPrice: 1000,
    };
    setTempFilters(defaultFilters);
    onFilterChange(defaultFilters);
    onClose();
  };

  /**
   * Handles applying current filter values
   * Updates parent component and closes drawer
   */
  const handleApply = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay onClick={onClose} aria-hidden="true" />
      <DrawerContainer 
        role="dialog"
        aria-label="Filter venues"
        aria-modal="true"
      >
        <DrawerHeader>
          <h2>Filters</h2>
          <CloseButton 
            onClick={onClose}
            aria-label="Close filters"
          >
            <FaTimes aria-hidden="true" />
          </CloseButton>
        </DrawerHeader>
        <DrawerContent>
          <Filters 
            initialFilters={tempFilters}
            onFilterChange={setTempFilters}
          />
        </DrawerContent>
        <DrawerFooter>
          <ClearButton 
            onClick={handleClear}
            aria-label="Clear all filters"
          >
            <FaTimes aria-hidden="true" /> Clear
          </ClearButton>
          <ApplyButton 
            onClick={handleApply}
            aria-label="Apply filters"
          >
            Apply Filters
          </ApplyButton>
        </DrawerFooter>
      </DrawerContainer>
    </>
  );
}

VenueFilterDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  initialFilters: PropTypes.shape({
    wifi: PropTypes.bool.isRequired,
    parking: PropTypes.bool.isRequired,
    breakfast: PropTypes.bool.isRequired,
    pets: PropTypes.bool.isRequired,
    maxPrice: PropTypes.number.isRequired,
  }).isRequired
};

export default VenueFilterDrawer; 