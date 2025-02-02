import { useState, useEffect } from 'react';
import { FaWifi, FaParking, FaCoffee, FaPaw } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  FiltersContainer,
  FilterSection,
  SectionTitle,
  FilterGroup,
  FilterOption,
  PriceRange,
  PriceInputs,
  PriceInput,
  CheckboxLabel,
} from './styles';

/**
 * VenueFilters Component
 * 
 * A comprehensive filter panel for refining venue search results based on
 * facilities and price range. Provides real-time filtering with a clean UI.
 * 
 * Features:
 * - Facility filters (WiFi, Parking, Breakfast, Pets)
 * - Price range slider
 * - Real-time filter updates
 * - Accessible form controls
 * - Visual icons for facilities
 * - Responsive design
 * - State persistence
 * - Clean and intuitive UI
 * 
 * @component
 * @example
 * ```jsx
 * <VenueFilters
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
 * @param {Object} props.initialFilters - Initial filter values
 * @param {boolean} props.initialFilters.wifi - WiFi filter state
 * @param {boolean} props.initialFilters.parking - Parking filter state
 * @param {boolean} props.initialFilters.breakfast - Breakfast filter state
 * @param {boolean} props.initialFilters.pets - Pets filter state
 * @param {number} props.initialFilters.maxPrice - Maximum price filter value
 * @param {Function} props.onFilterChange - Callback when any filter changes
 */
function VenueFilters({ onFilterChange, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters || {
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    maxPrice: 1000,
  });

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  /**
   * Handles checkbox state changes for facility filters
   * @param {string} name - Name of the facility filter
   */
  const handleCheckboxChange = (name) => {
    const newFilters = {
      ...filters,
      [name]: !filters[name],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  /**
   * Handles price range slider changes
   * @param {Event} e - Change event from range input
   */
  const handlePriceChange = (e) => {
    const newFilters = {
      ...filters,
      maxPrice: parseInt(e.target.value, 10),
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <FiltersContainer role="form" aria-label="Venue filters">
      <FilterSection>
        <SectionTitle>Facilities</SectionTitle>
        <FilterGroup>
          <FilterOption>
            <input
              type="checkbox"
              id="wifi"
              checked={filters.wifi}
              onChange={() => handleCheckboxChange('wifi')}
              aria-label="Filter by WiFi availability"
            />
            <CheckboxLabel htmlFor="wifi">
              <FaWifi aria-hidden="true" className="fa-wifi" /> WiFi
            </CheckboxLabel>
          </FilterOption>
          
          <FilterOption>
            <input
              type="checkbox"
              id="parking"
              checked={filters.parking}
              onChange={() => handleCheckboxChange('parking')}
              aria-label="Filter by parking availability"
            />
            <CheckboxLabel htmlFor="parking">
              <FaParking aria-hidden="true" className="fa-parking" /> Parking
            </CheckboxLabel>
          </FilterOption>
          
          <FilterOption>
            <input
              type="checkbox"
              id="breakfast"
              checked={filters.breakfast}
              onChange={() => handleCheckboxChange('breakfast')}
              aria-label="Filter by breakfast availability"
            />
            <CheckboxLabel htmlFor="breakfast">
              <FaCoffee aria-hidden="true" className="fa-coffee" /> Breakfast
            </CheckboxLabel>
          </FilterOption>
          
          <FilterOption>
            <input
              type="checkbox"
              id="pets"
              checked={filters.pets}
              onChange={() => handleCheckboxChange('pets')}
              aria-label="Filter by pet-friendly venues"
            />
            <CheckboxLabel htmlFor="pets">
              <FaPaw aria-hidden="true" className="fa-paw" /> Pets Allowed
            </CheckboxLabel>
          </FilterOption>
        </FilterGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Price Range</SectionTitle>
        <PriceRange>
          <PriceInputs>
            <PriceInput>
              <span>Max price:</span>
              <span>${filters.maxPrice}</span>
            </PriceInput>
          </PriceInputs>
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            aria-label={`Maximum price: $${filters.maxPrice}`}
          />
        </PriceRange>
      </FilterSection>
    </FiltersContainer>
  );
}

VenueFilters.propTypes = {
  initialFilters: PropTypes.shape({
    wifi: PropTypes.bool.isRequired,
    parking: PropTypes.bool.isRequired,
    breakfast: PropTypes.bool.isRequired,
    pets: PropTypes.bool.isRequired,
    maxPrice: PropTypes.number.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default VenueFilters;