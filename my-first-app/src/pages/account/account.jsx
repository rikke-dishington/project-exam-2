import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useUser } from '../../contexts/UserContext';
import { getProfile, getProfileVenues, getProfileBookings } from '../../utils/api/profiles';
import { updateVenue, createVenue, deleteVenue } from '../../utils/api/venues';
import AccountManagement from '../../components/account/AccountManagement';
import VenueManagerCard from '../../components/venues/VenueManagerCard';
import VenueForm from '../../components/venues/VenueForm';
import {
  PageContainer,
  AccountContainer,
  TabContainer,
  Tab,
  AccountContent,
  ErrorMessage,
  SuccessMessage,
  VenuesContainer,
  BookingsContainer,
  AddVenueButton,
  EmptyState,
  HeaderContainer
} from './account.styles';

function Account() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const fetchUserData = async () => {
    if (!user?.name) return;

    try {
      setIsLoading(true);
      setError(null);

      const profileData = await getProfile(user.name);
      setProfile(profileData);

      if (activeTab === 'venues') {
        const venuesData = await getProfileVenues(user.name);
        setVenues(venuesData);
      }

      if (activeTab === 'bookings') {
        const bookingsData = await getProfileBookings(user.name);
        setBookings(bookingsData);
      }

    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.name, activeTab]);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      setSuccess('Profile updated successfully!');
      await fetchUserData();
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message);
    }
  };

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setShowForm(true);
  };

  const handleDeleteVenue = async (venueId) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await deleteVenue(venueId);
      setVenues(prevVenues => prevVenues.filter(venue => venue.id !== venueId));
      setSuccess('Venue successfully deleted');
    } catch (err) {
      console.error('Venue deletion error:', err);
      setError(err.message || 'Failed to delete venue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVenue = async (venueData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (selectedVenue) {
        await updateVenue(selectedVenue.id, venueData);
        setVenues(prevVenues => 
          prevVenues.map(venue => 
            venue.id === selectedVenue.id ? { ...venue, ...venueData } : venue
          )
        );
      } else {
      
        const newVenue = await createVenue(venueData);
        setVenues(prevVenues => [...prevVenues, newVenue]);
      }

      setShowForm(false);
      setSuccess('Venue successfully ' + (selectedVenue ? 'updated' : 'created'));
      setSelectedVenue(null);
    } catch (err) {
      console.error('Venue submission error:', err);
      setError(err.message || 'Failed to save venue');
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookings = () => {
    if (isLoading) return <div>Loading bookings...</div>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!bookings || bookings.length === 0) return <div>No bookings found</div>;

    return (
      <BookingsContainer>
        {bookings.map(booking => {
          if (!booking) return null;
          
          return (
            <div key={booking.id} className="booking-card">
              <h3>{booking.venue?.name || 'Unnamed Venue'}</h3>
              <p>Check-in: {new Date(booking.dateFrom).toLocaleDateString()}</p>
              <p>Check-out: {new Date(booking.dateTo).toLocaleDateString()}</p>
              <p>Guests: {booking.guests}</p>
              <p>Status: {booking.status || 'Confirmed'}</p>
              {booking.venue && (
                <div className="venue-details">
                  <p>Location: {booking.venue.location?.city || 'N/A'}</p>
                  <p>Price per night: ${booking.venue.price || 'N/A'}</p>
                </div>
              )}
            </div>
          );
        })}
      </BookingsContainer>
    );
  };

  const renderVenues = () => {
    if (isLoading) return <div>Loading venues...</div>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
      <div>
        <HeaderContainer>
          <h2>My Venues</h2>
          <AddVenueButton onClick={() => setShowForm(true)}>
            <FiPlus /> Add New Venue
          </AddVenueButton>
        </HeaderContainer>
        
        {!venues.length ? (
          <EmptyState>
            <p>You haven't created any venues yet.</p>
            <p>Click the button above to add your first venue!</p>
          </EmptyState>
        ) : (
          <VenuesContainer>
            {venues.map(venue => (
              <VenueManagerCard
                key={venue.id}
                venue={venue}
                onEdit={handleEditVenue}
                onDelete={handleDeleteVenue}
              />
            ))}
          </VenuesContainer>
        )}

        {showForm && (
          <VenueForm
            venue={selectedVenue}
            onSubmit={handleSubmitVenue}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    );
  };

  if (!user) return <div>Please log in to view your account</div>;
  if (isLoading && !profile) return <div>Loading...</div>;

  return (
    <PageContainer>
      <AccountContainer>
        <TabContainer>
          <Tab 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </Tab>
          <Tab 
            active={activeTab === 'bookings'} 
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </Tab>
          {profile?.venueManager && (
            <Tab 
              active={activeTab === 'venues'} 
              onClick={() => setActiveTab('venues')}
            >
              My Venues
            </Tab>
          )}
        </TabContainer>

        <AccountContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          {activeTab === 'profile' && profile && (
            <AccountManagement 
              profile={profile} 
              onProfileUpdate={handleProfileUpdate}
            />
          )}

          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'venues' && profile?.venueManager && renderVenues()}
        </AccountContent>
      </AccountContainer>
    </PageContainer>
  );
}

export default Account;