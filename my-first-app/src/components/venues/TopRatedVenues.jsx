import { useState, useEffect } from 'react';
import { getAllVenues } from '../../utils/api/venues';
import VenueCard from './VenueCard';
import { Section, Grid, Title, Subtitle } from './TopRatedVenues.styles';

function TopRatedVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopVenues = async () => {
      try {
        const data = await getAllVenues({
          sort: 'rating',
          sortOrder: 'desc',
          limit: 4,
          _owner: true
        });
        setVenues(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopVenues();
  }, []);

  if (loading) return <div>Loading top venues...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Section>
      <Title>Top Rated Venues</Title>
      <Subtitle>Travel to one of our top rated destinations</Subtitle>
      <Grid>
        {venues.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </Grid>
    </Section>
  );
}

export default TopRatedVenues;