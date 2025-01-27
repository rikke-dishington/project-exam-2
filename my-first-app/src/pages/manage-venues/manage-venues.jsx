import { useState, useEffect } from 'react';
import { Container, Header, VenuesList, ActionButton } from './manage-venues.styles';

function ManageVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch user's venues
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Header>
        <h1>Manage Venues</h1>
        <ActionButton to="/venues/create">
          Create New Venue
        </ActionButton>
      </Header>
      <VenuesList>
        {venues.length === 0 ? (
          <p>No venues found. Create your first venue!</p>
        ) : (
          venues.map(venue => (
            <div key={venue.id}>
              {/* TODO: Add venue management card */}
            </div>
          ))
        )}
      </VenuesList>
    </Container>
  );
}

export default ManageVenues; 