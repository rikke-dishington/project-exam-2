import { FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  FiltersSection,
  FilterButton,
  ActiveFilterDot
} from './styles';

/**
 * VenueFiltersBar Component
 * 
 * A compact filter button component that opens the filter drawer and shows
 * active filter status. Provides a clean interface for accessing venue filters.
 * 
 * Features:
 * - Filter button with icon
 * - Active filters indicator dot
 * - Compact and clean design
 * - Accessible button controls
 * - Visual feedback for active state
 * - Mobile-friendly interface
 * - Consistent styling
 * 
 * @component
 * @example
 * ```jsx
 * <VenueFiltersBar
 *   hasActiveFilters={true}
 *   onFilterClick={() => setIsFilterDrawerOpen(true)}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.hasActiveFilters - Whether any filters are currently active
 * @param {Function} props.onFilterClick - Callback when filter button is clicked
 */
function VenueFiltersBar({ hasActiveFilters, onFilterClick }) {
  return (
    <FiltersSection>
      <FilterButton 
        onClick={onFilterClick}
        aria-label={`${hasActiveFilters ? 'Modify active filters' : 'Open filters'}`}
      >
        <FaFilter aria-hidden="true" /> 
        <span>Filters</span>
        {hasActiveFilters && <ActiveFilterDot role="status" aria-label="Filters are active" />}
      </FilterButton>
    </FiltersSection>
  );
}

VenueFiltersBar.propTypes = {
  hasActiveFilters: PropTypes.bool.isRequired,
  onFilterClick: PropTypes.func.isRequired
};

export default VenueFiltersBar; 