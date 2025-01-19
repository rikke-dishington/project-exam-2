import { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX, FiPlus } from 'react-icons/fi';
import { useUser } from '../../contexts/UserContext';
import { profileEndpoints, bookingEndpoints, venueEndpoints } from '../../utils/api';
import VenueManagerCard from '../../components/venues/VenueManagerCard';
import VenueForm from '../../components/venues/VenueForm';
import {
  PageContainer,
  AccountContainer,
  TabContainer,
  Tab,
  AccountContent,
  ProfileSection,
  AvatarSection,
  Avatar,
  AvatarUpload,
  UserInfo,
  UserInfoHeader,
  EditButton,
  EditableField,
  ButtonGroup,
  SaveButton,
  CancelButton,
  Bio,
  ErrorMessage,
  SuccessMessage,
  BookingsContainer,
  VenuesContainer,
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.name) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch profile data
        const profileData = await profileEndpoints.getProfile(user.name);
        console.log('Profile data:', profileData);
        setProfile(profileData);

        // Fetch user's bookings
        if (activeTab === 'bookings') {
          const bookingsData = await bookingEndpoints.getMyBookings();
          console.log('Bookings data:', bookingsData);
          setBookings(Array.isArray(bookingsData) ? bookingsData : []);
        }

        // Fetch user's venues
        if (activeTab === 'venues') {
          const venuesData = await profileEndpoints.getProfileVenues(user.name);
          console.log('Venues data:', venuesData);
          setVenues(Array.isArray(venuesData) ? venuesData : []);
        }

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.name, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
      
      await venueEndpoints.deleteVenue(venueId);
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
        // Update existing venue
        await venueEndpoints.updateVenue(selectedVenue.id, venueData);
        setVenues(prevVenues => 
          prevVenues.map(venue => 
            venue.id === selectedVenue.id ? { ...venue, ...venueData } : venue
          )
        );
      } else {
        // Create new venue
        const newVenue = await venueEndpoints.createVenue(venueData);
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

  const handleAvatarUpdate = (e) => {
    // Implement avatar update logic
  };

  const handleSaveProfile = () => {
    // Implement save profile logic
  };

  const renderBookings = () => {
    if (isLoading) return <div>Loading bookings...</div>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;
    if (!bookings || bookings.length === 0) return <div>No bookings found</div>;

    return (
      <BookingsContainer>
        {bookings.map(booking => {
          // Ensure booking and venue exist before rendering
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

  return (
    <PageContainer>
      <AccountContainer>
        <TabContainer>
          <Tab 
            active={activeTab === 'profile'} 
            onClick={() => handleTabChange('profile')}
          >
            Profile
          </Tab>
          <Tab 
            active={activeTab === 'bookings'} 
            onClick={() => handleTabChange('bookings')}
          >
            My Bookings
          </Tab>
          {profile?.venueManager && (
            <Tab 
              active={activeTab === 'venues'} 
              onClick={() => handleTabChange('venues')}
            >
              My Venues
            </Tab>
          )}
        </TabContainer>

        <AccountContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          {activeTab === 'profile' && profile && (
            <ProfileSection>
              <AvatarSection>
                <Avatar 
                  src={profile.avatar || '/default-avatar.png'} 
                  alt="Profile avatar" 
                />
                <AvatarUpload>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleAvatarUpdate}
                    id="avatar-upload"
                    hidden
                  />
                  <label htmlFor="avatar-upload">
                    <FiEdit2 /> Update Avatar
                  </label>
                </AvatarUpload>
              </AvatarSection>
              <UserInfo>
                {isEditing ? (
                  <>
                    <EditableField>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          name: e.target.value
                        }))}
                        placeholder="Your name"
                        disabled
                      />
                    </EditableField>
                    <p>{profile.email}</p>
                    <EditableField>
                      <textarea
                        value={editedProfile.bio || ''}
                        onChange={(e) => setEditedProfile(prev => ({
                          ...prev,
                          bio: e.target.value
                        }))}
                        placeholder="Tell us about yourself..."
                      />
                    </EditableField>
                    <EditableField>
                      <label>
                        <input
                          type="checkbox"
                          checked={editedProfile.venueManager}
                          onChange={(e) => setEditedProfile(prev => ({
                            ...prev,
                            venueManager: e.target.checked
                          }))}
                        />
                        I want to be a venue manager
                      </label>
                    </EditableField>
                    <ButtonGroup>
                      <SaveButton onClick={handleSaveProfile}>
                        <FiSave /> Save Changes
                      </SaveButton>
                      <CancelButton onClick={() => {
                        setIsEditing(false);
                        setEditedProfile(profile);
                      }}>
                        <FiX /> Cancel
                      </CancelButton>
                    </ButtonGroup>
                  </>
                ) : (
                  <>
                    <UserInfoHeader>
                      <div>
                        <h2>{profile.name}</h2>
                        <p>{profile.email}</p>
                      </div>
                      <EditButton onClick={() => {
                        setIsEditing(true);
                        setEditedProfile({ ...profile });
                      }}>
                        <FiEdit2 /> Edit Profile
                      </EditButton>
                    </UserInfoHeader>
                    {profile.bio && <Bio>{profile.bio}</Bio>}
                    {profile.venueManager && (
                      <span className="badge">Venue Manager</span>
                    )}
                  </>
                )}
              </UserInfo>
            </ProfileSection>
          )}

          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'venues' && renderVenues()}
        </AccountContent>
      </AccountContainer>
    </PageContainer>
  );
}

export default Account;