import { useState, useEffect } from 'react';
import { FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { useUser } from '../../contexts/UserContext';
import { getAllVenues, createVenue, updateVenue, deleteVenue } from '../../utils/api/venues';
import VenueForm from './VenueForm';
import VenueManagerCard from './VenueManagerCard';
import {
  VenueGrid,
  AddVenueButton,
  EmptyState,
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage,
  ConfirmDialog,
  ConfirmButtons,
  ActionButton
} from './VenueManagement.styles';

function VenueManagement() {
  const { user } = useUser();
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoading(true);
        const data = await getAllVenues({ _owner: user?.name });
        setVenues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchVenues();
    }
  }, [user]);

  const handleAddVenue = () => {
    setSelectedVenue(null);
    setShowForm(true);
  };

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setShowForm(true);
  };

  const handleDeleteClick = (venue) => {
    setVenueToDelete(venue);
    setShowConfirmDelete(true);
  };

  const handleSubmitVenue = async (formData) => {
    try {
      setIsLoading(true);
      if (selectedVenue) {
        const updatedVenue = await updateVenue(selectedVenue.id, formData);
        setVenues(prev => prev.map(v => 
          v.id === selectedVenue.id ? updatedVenue : v
        ));
        setSuccess('Venue updated successfully!');
      } else {
        const newVenue = await createVenue(formData);
        setVenues(prev => [newVenue, ...prev]);
        setSuccess('Venue created successfully!');
      }
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVenue = async () => {
    try {
      setIsLoading(true);
      await deleteVenue(venueToDelete.id);
      setVenues(prev => prev.filter(v => v.id !== venueToDelete.id));
      setShowConfirmDelete(false);
      setSuccess('Venue deleted successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess('');
  };

  if (!user) return <div>Please log in to manage venues</div>;
  
  return (
    <div>
      {error && (
        <ErrorMessage onClick={clearMessages}>
          {error} (Click to dismiss)
        </ErrorMessage>
      )}
      
      {success && (
        <SuccessMessage onClick={clearMessages}>
          {success} (Click to dismiss)
        </SuccessMessage>
      )}

      <AddVenueButton onClick={handleAddVenue}>
        <FiPlus /> Add New Venue
      </AddVenueButton>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : venues.length === 0 ? (
        <EmptyState>
          <p>You haven't created any venues yet.</p>
          <p>Click the button above to add your first venue!</p>
        </EmptyState>
      ) : (
        <VenueGrid>
          {venues.map((venue) => (
            <VenueManagerCard
              key={venue.id}
              venue={venue}
              onEdit={handleEditVenue}
              onDelete={handleDeleteClick}
            />
          ))}
        </VenueGrid>
      )}

      {showForm && (
        <VenueForm
          venue={selectedVenue}
          onSubmit={handleSubmitVenue}
          onClose={() => setShowForm(false)}
        />
      )}

      {showConfirmDelete && (
        <ConfirmDialog>
          <div>
            <h3>Delete Venue</h3>
            <p>Are you sure you want to delete "{venueToDelete?.name}"?</p>
            <p>This action cannot be undone.</p>
            <ConfirmButtons>
              <ActionButton onClick={handleDeleteVenue}>
                <FiCheck /> Yes, Delete
              </ActionButton>
              <ActionButton 
                className="cancel" 
                onClick={() => setShowConfirmDelete(false)}
              >
                <FiX /> Cancel
              </ActionButton>
            </ConfirmButtons>
          </div>
        </ConfirmDialog>
      )}
    </div>
  );
}

export default VenueManagement;
