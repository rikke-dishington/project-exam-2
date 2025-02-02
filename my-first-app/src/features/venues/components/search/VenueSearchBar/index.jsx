import { FaSearch, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  ClearButton,
  SearchButton
} from './styles';

/**
 * VenueSearchBar Component
 * 
 * A search bar component for filtering venues by search terms. Provides real-time
 * search input with clear functionality and submit button.
 * 
 * Features:
 * - Real-time search input
 * - Clear button when search has content
 * - Submit button with icon
 * - Form submission handling
 * - Accessible controls
 * - Responsive design
 * - Clean and modern UI
 * - Keyboard navigation support
 * 
 * @component
 * @example
 * ```jsx
 * <VenueSearchBar
 *   searchTerm="beach"
 *   onSearchChange={(value) => setSearchTerm(value)}
 *   onSearch={(term) => handleSearch(term)}
 *   onClear={() => {
 *     setSearchTerm('');
 *     handleSearch('');
 *   }}
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search term value
 * @param {Function} props.onSearchChange - Callback when search input changes
 * @param {Function} props.onSearch - Callback when search is submitted
 * @param {Function} props.onClear - Callback when search is cleared
 */
function VenueSearchBar({ searchTerm, onSearchChange, onSearch, onClear }) {
  /**
   * Handles form submission and prevents default behavior
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <SearchContainer onSubmit={handleSubmit} role="search">
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search venues..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search venues"
        />
        {searchTerm && (
          <ClearButton 
            type="button"
            onClick={onClear}
            aria-label="Clear search"
          >
            <FaTimes aria-hidden="true" />
          </ClearButton>
        )}
      </SearchInputWrapper>
      <SearchButton 
        type="submit"
        aria-label="Search"
      >
        <FaSearch aria-hidden="true" />
      </SearchButton>
    </SearchContainer>
  );
}

VenueSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default VenueSearchBar; 