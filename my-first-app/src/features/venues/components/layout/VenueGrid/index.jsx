import VenueCard from '../VenueCard';
import { Grid, NoResults } from './styles';

function VenueGrid({ venues, onVenueClick, searchQuery }) {
  if (venues.length === 0) {
    return (
      <NoResults>
        {searchQuery 
          ? `No venues found matching "${searchQuery}"`
          : 'No venues available'}
      </NoResults>
    );
  }

  return (
    <Grid>
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

export default VenueGrid; 