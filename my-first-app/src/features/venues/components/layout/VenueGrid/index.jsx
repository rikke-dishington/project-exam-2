import PropTypes from 'prop-types';
import VenueCard from '../VenueCard';
import { Grid, NoResults } from './styles';

/**
 * VenueGrid Component
 * 
 * A responsive grid layout component that displays a collection of venue cards.
 * Handles both the grid layout and empty state messaging.
 * 
 * Features:
 * - Responsive grid layout
 * - Empty state handling
 * - Search results messaging
 * - Accessible structure
 * - Consistent spacing and alignment
 * - Flexible venue card rendering
 * 
 * @component
 * @example
 * ```jsx
 * <VenueGrid
 *   venues={[
 *     {
 *       id: '123',
 *       name: 'Beach House',
 *       price: 150,
 *       location: { city: 'Miami', country: 'USA' }
 *     },
 *     // ... more venues
 *   ]}
 *   onVenueClick={(id) => navigate(`/venue/${id}`)}
 *   searchQuery="beach"
 * />
 * ```
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.venues - Array of venue objects to display
 * @param {Function} props.onVenueClick - Callback function when a venue is clicked
 * @param {string} [props.searchQuery] - Optional search query to display in empty state message
 */
function VenueGrid({ venues, onVenueClick, searchQuery }) {
  if (venues.length === 0) {
    return (
      <NoResults role="status">
        {searchQuery 
          ? `No venues found matching "${searchQuery}"`
          : 'No venues available'}
      </NoResults>
    );
  }

  return (
    <Grid role="grid">
      {venues.map(venue => (
        <VenueCard 
          key={venue.id} 
          venue={venue} 
          onClick={() => onVenueClick(venue.id)}
        />
      ))}
    </Grid>
  );
}

VenueGrid.propTypes = {
  venues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string
    }).isRequired
  })).isRequired,
  onVenueClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string
};

export default VenueGrid; 