import { useState, useEffect } from 'react';
import { getAllVenues } from '../../utils/api/venues';
import VenueCard from '../../components/venues/VenueCard';
import { Section, Grid, Title } from '../../components/venues/TopRatedVenues.styles';
import { LoadMoreButton } from './venues.styles';

function Venues() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 12;
  const LOAD_MORE_COUNT = 8;

  useEffect(() => {
    const fetchVenues = async () => {
      setIsLoading(true);
      try {
        const data = await getAllVenues({ 
          limit: ITEMS_PER_PAGE,
          offset: 0
        });
        setVenues(data);
        setHasMore(data.length === ITEMS_PER_PAGE);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const offset = page * ITEMS_PER_PAGE + ((page - 1) * LOAD_MORE_COUNT);
      const newData = await getAllVenues({ 
        limit: LOAD_MORE_COUNT,
        offset: offset
      });
      
      if (newData.length > 0) {
        setVenues(prevVenues => [...prevVenues, ...newData]);
        setPage(prevPage => prevPage + 1);
        setHasMore(newData.length === LOAD_MORE_COUNT);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <Section>
        <Title>All Venues</Title>
        {isLoading && venues.length === 0 ? (
          <div>Loading venues...</div>
        ) : venues.length === 0 ? (
          <div>No venues found</div>
        ) : (
          <Grid>
            {venues.map(venue => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </Grid>
        )}
        {hasMore && venues.length >= ITEMS_PER_PAGE && (
          <LoadMoreButton 
            onClick={handleLoadMore} 
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Venues'}
          </LoadMoreButton>
        )}
      </Section>
    </main>
  );
}

export default Venues;