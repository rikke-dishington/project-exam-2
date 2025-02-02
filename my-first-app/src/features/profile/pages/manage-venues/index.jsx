import { useState, useEffect } from 'react';
import { useUser } from '../../../../context/UserContext';
import { venueApi } from '../../../venues/api/venues';
import {
  ManageVenueHeader,
  ManageVenueCard,
  VenueFormModal,
  VenueDeleteModal,
  VenueBookingsModal
} from '../../components';
import {
  Container,
  VenueGrid,
  LoadingSpinner,
  ErrorMessage,
  NoVenuesMessage
} from './styles';

/**
 * ManageVenues Page Component
 * 
 * A comprehensive venue management interface that allows venue managers to create,
 * edit, delete, and view bookings for their venues. This component serves as the
 * main dashboard for venue management operations.
 * 
 * Features:
 * - List of managed venues with their details
 * - Create new venues
 * - Edit existing venues
 * - Delete venues with confirmation
 * - View bookings for each venue
 * - Loading states and error handling
 * - Success/error message display
 * - Empty state handling
 * 
 * State Management:
 * - Manages venues data fetching and updates
 * - Handles modal states for different operations
 * - Manages loading and error states
 * - Tracks selected venue for operations
 * - Handles success/error messages
 * 
 * @component
 * @example
 * ```jsx
 * // This component is typically rendered as a route in the application
 * <Route path="/manage-venues" element={<ManageVenues />} />
 * ```
 */
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

  /**
   * Fetches venues owned by the current user on component mount
   * and when the user's name changes
   */
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await venueApi.getVenuesByProfile(user.name);
        setVenues(response);
      } catch (err) {
        setError(err.message || 'Failed to load venues');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [user.name]);

  /**
   * Opens the venue form modal for creating a new venue
   */
  const handleCreateVenue = () => {
    setSelectedVenue(null);
    setIsModalOpen(true);
  };

  /**
   * Opens the venue form modal for editing an existing venue
   * @param {Object} venue - The venue to be edited
   */
  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setIsModalOpen(true);
  };

  /**
   * Opens the delete confirmation modal for a venue
   * @param {Object} venue - The venue to be deleted
   */
  const handleDeleteVenue = (venue) => {
    setSelectedVenue(venue);
    setIsDeleteModalOpen(true);
  };

  /**
   * Opens the bookings modal for a venue
   * @param {Object} venue - The venue to view bookings for
   */
  const handleViewBookings = (venue) => {
    setSelectedVenue(venue);
    setIsBookingsModalOpen(true);
  };

  /**
   * Handles saving a venue (create or update)
   * @param {Object} venueData - The venue data to be saved
   */
  const handleSaveVenue = async (venueData) => {
    try {
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
      setError(err.message || 'Failed to save venue');
    }
  };

  /**
   * Handles the confirmation of venue deletion
   */
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
      <ManageVenueHeader onCreateClick={handleCreateVenue} />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {message && (
        <ErrorMessage $success={message.type === 'success'}>
          {message.text}
        </ErrorMessage>
      )}

      {venues.length === 0 ? (
        <NoVenuesMessage>
          You haven't created any venues yet. Click the button above to create your first venue!
        </NoVenuesMessage>
      ) : (
        <VenueGrid>
          {venues.map(venue => (
            <ManageVenueCard
              key={venue.id}
              venue={venue}
              onEdit={handleEditVenue}
              onDelete={handleDeleteVenue}
              onViewBookings={handleViewBookings}
            />
          ))}
        </VenueGrid>
      )}

      {isModalOpen && (
        <VenueFormModal
          venue={selectedVenue}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveVenue}
        />
      )}

      {isDeleteModalOpen && (
        <VenueDeleteModal
          venueName={selectedVenue?.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isBookingsModalOpen && (
        <VenueBookingsModal
          venue={selectedVenue}
          onClose={() => setIsBookingsModalOpen(false)}
        />
      )}
    </Container>
  );
}

export default ManageVenues; 