import PropTypes from 'prop-types';
import { SelectWrapper, Select } from './styles';

/**
 * VenueSort Component
 * 
 * A dropdown component for sorting venue listings by different criteria.
 * Provides common sorting options like price and rating.
 * 
 * Features:
 * - Multiple sorting options
 * - Default recommended sort
 * - Price sorting (low to high and high to low)
 * - Rating-based sorting
 * - Native select element for best accessibility
 * - Styled dropdown appearance
 * - Responsive design
 * 
 * @component
 * @example
 * ```jsx
 * <VenueSort
 *   sortBy="price_low"
 *   onSort={(value) => {
 *     setSortBy(value);
 *     sortVenues(value);
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.sortBy - Current sort option value
 * @param {Function} props.onSort - Callback when sort option changes
 */
function VenueSort({ sortBy, onSort }) {
  return (
    <SelectWrapper>
      <Select 
        value={sortBy} 
        onChange={(e) => onSort(e.target.value)}
        aria-label="Sort venues by"
      >
        <option value="default">Recommended</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </Select>
    </SelectWrapper>
  );
}

VenueSort.propTypes = {
  sortBy: PropTypes.oneOf(['default', 'price_low', 'price_high', 'rating']).isRequired,
  onSort: PropTypes.func.isRequired
};

export default VenueSort; 