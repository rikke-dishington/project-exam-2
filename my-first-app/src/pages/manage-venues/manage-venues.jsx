import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { venueApi } from '../../utils/api/venues';
import { FaPlus, FaEdit, FaTrash, FaCalendar } from 'react-icons/fa';
import {
  Container,
  Header,
  CreateButton,
  VenueGrid,
  VenueCard,
  VenueImage,
  VenueDetails,
  ActionButtons,
  IconButton,
  LoadingSpinner,
  ErrorMessage,
  NoVenuesMessage
} from './manage-venues.styles';
import VenueModal from './components/venue-modal';
import DeleteConfirmModal from './components/delete-confirm-modal';
import BookingsModal from './components/bookings-modal';

function ManageVenues() {
  const { user } = useUser();
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await venueApi.getVenuesByProfile(user.name);
        setVenues(response);
      } catch (err) {
        setError('Failed to load venues');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [user.name]);

  const handleCreateVenue = () => {
    setSelectedVenue(null);
    setIsModalOpen(true);
  };

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  const handleDeleteVenue = (venue) => {
    setSelectedVenue(venue);
    setIsDeleteModalOpen(true);
  };

  const handleViewBookings = (venue) => {
    setSelectedVenue(venue);
    setIsBookingsModalOpen(true);
  };

  const handleSaveVenue = async (venueData) => {
    try {
      console.log('handleSaveVenue received:', venueData);
      let updatedVenue;
      
      if (typeof venueData !== 'object' || venueData === null) {
        throw new Error('Invalid venue data format');
      }

      if (selectedVenue) {
        updatedVenue = await venueApi.updateVenue(selectedVenue.id, venueData);
      } else {
        updatedVenue = await venueApi.createVenue(venueData);
      }

      setVenues(prev => 
        selectedVenue 
          ? prev.map(v => v.id === updatedVenue.id ? updatedVenue : v)
          : [...prev, updatedVenue]
      );
      
      setIsModalOpen(false);
      setMessage({
        type: 'success',
        text: `Venue successfully ${selectedVenue ? 'updated' : 'created'}`
      });
    } catch (err) {
      console.error('Save venue error:', err);
      setError(err.message || 'Failed to save venue');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await venueApi.deleteVenue(selectedVenue.id);
      setVenues(venues.filter(v => v.id !== selectedVenue.id));
      setIsDeleteModalOpen(false);
      setMessage({
        type: 'success',
        text: 'Venue successfully deleted'
      });
    } catch (err) {
      setError(err.message || 'Failed to delete venue');
    }
  };

  if (isLoading) {
    return <LoadingSpinner>Loading venues...</LoadingSpinner>;
  }

  return (
    <Container>
      <Header>
        <h1>Manage Venues</h1>
        <CreateButton onClick={handleCreateVenue}>
          <FaPlus />
          Create New Venue
        </CreateButton>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {venues.length === 0 ? (
        <NoVenuesMessage>
          You haven't created any venues yet. Click the button above to create your first venue!
        </NoVenuesMessage>
      ) : (
        <VenueGrid>
          {venues.map(venue => (
            <VenueCard key={venue.id}>
              <VenueImage>
                {venue.media?.[0] ? (
                  <img src={venue.media[0].url} alt={venue.media[0].alt} />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </VenueImage>
              <VenueDetails>
                <h3>{venue.name}</h3>
                <p>{venue.location.city}, {venue.location.country}</p>
                <p className="price">Price per night: ${venue.price}</p>
              </VenueDetails>
              <ActionButtons>
                <IconButton onClick={() => handleViewBookings(venue)} title="View Bookings">
                  <FaCalendar />
                </IconButton>
                <IconButton onClick={() => handleEditVenue(venue)} title="Edit Venue">
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => handleDeleteVenue(venue)} title="Delete Venue" $danger>
                  <FaTrash />
                </IconButton>
              </ActionButtons>
            </VenueCard>
          ))}
        </VenueGrid>
      )}

      {isModalOpen && (
        <VenueModal
          venue={selectedVenue}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveVenue}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          venueName={selectedVenue?.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isBookingsModalOpen && (
        <BookingsModal
          venue={selectedVenue}
          onClose={() => setIsBookingsModalOpen(false)}
        />
      )}
    </Container>
  );
}

export default ManageVenues; 