import { useState, useEffect } from 'react';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useUser } from '../../contexts/UserContext';
import BookingsList from '../../components/bookings/BookingsList';
import VenueManagement from '../../components/venues/VenueManagement';
import { getProfile, updateProfile } from '../../utils/api/profiles';
import {
  AccountContainer,
  AccountHeader,
  AccountTitle,
  AccountContent,
  ProfileSection,
  AvatarSection,
  Avatar,
  AvatarUpload,
  UserInfo,
  UserInfoHeader,
  BookingsSection,
  VenuesSection,
  SectionTitle,
  TabContainer,
  Tab,
  BannerImage,
  Bio,
  ErrorMessage,
  SuccessMessage,
  EditButton,
  EditableField,
  TextArea,
  ButtonGroup,
  ToggleSwitch
} from './account.styles';

const MAX_BIO_LENGTH = 500;
const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function Account() {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const profileData = await getProfile(user.name);
        setProfile(profileData);
        setEditedProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const validateAvatar = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error('Please upload a valid image file (JPEG, PNG, or GIF)');
    }
    if (file.size > MAX_AVATAR_SIZE) {
      throw new Error('Image size should be less than 2MB');
    }
  };

  const handleAvatarUpdate = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      validateAvatar(file);
      setIsUploading(true);
      setError(null);
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const updatedProfile = await updateProfile(user.name, {
            avatar: reader.result
          });
          setProfile(updatedProfile);
          setSuccess('Avatar updated successfully!');
          if (updateUser) {
            updateUser(updatedProfile);
          }
        } catch (err) {
          setError('Failed to update avatar. Please try again.');
        } finally {
          setIsUploading(false);
        }
      };
    } catch (err) {
      setError(err.message);
      setIsUploading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile({
      ...profile,
      venueManager: profile.venueManager || false
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(null);
    setError(null);
  };

  const handleVenueManagerToggle = async (e) => {
    const newValue = e.target.checked;
    if (newValue && !window.confirm('Are you sure you want to become a venue manager? This will allow you to create and manage venues.')) {
      e.preventDefault();
      return;
    }
    
    setEditedProfile(prev => ({
      ...prev,
      venueManager: newValue
    }));
  };

  const validateBio = (bio) => {
    if (bio && bio.length > MAX_BIO_LENGTH) {
      throw new Error(`Bio must be ${MAX_BIO_LENGTH} characters or less`);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      validateBio(editedProfile.bio);

      const updatedProfile = await updateProfile(user.name, {
        ...editedProfile,
        venueManager: editedProfile.venueManager
      });

      setProfile(updatedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      if (updateUser) {
        updateUser(updatedProfile);
      }
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

  if (!user) return <div>Please log in to view your account</div>;
  if (isLoading && !profile) return <div>Loading...</div>;
  if (error && !profile) return <ErrorMessage>{error}</ErrorMessage>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <AccountContainer>
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

      {profile.banner && (
        <BannerImage 
          src={profile.banner} 
          alt="Profile banner" 
        />
      )}

      <AccountHeader>
        <AccountTitle>My Account</AccountTitle>
      </AccountHeader>

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
        {profile.venueManager && (
          <Tab 
            active={activeTab === 'venues'} 
            onClick={() => setActiveTab('venues')}
          >
            My Venues
          </Tab>
        )}
      </TabContainer>

      <AccountContent>
        {activeTab === 'profile' && (
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
                  disabled={isUploading}
                />
                <label htmlFor="avatar-upload">
                  <FiEdit2 /> {isUploading ? 'Uploading...' : 'Update Avatar'}
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
                  <div className="venue-manager-toggle">
                    <label>
                      Venue Manager
                      <ToggleSwitch
                        checked={editedProfile.venueManager}
                        onChange={handleVenueManagerToggle}
                      />
                    </label>
                  </div>
                  <TextArea
                    value={editedProfile.bio || ''}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      bio: e.target.value
                    }))}
                    placeholder="Tell us about yourself..."
                    maxLength={MAX_BIO_LENGTH}
                  />
                  <small>{editedProfile.bio?.length || 0}/{MAX_BIO_LENGTH}</small>
                  <ButtonGroup>
                    <EditButton onClick={handleSaveProfile} disabled={isLoading}>
                      <FiSave /> {isLoading ? 'Saving...' : 'Save Changes'}
                    </EditButton>
                    <EditButton onClick={handleCancelEdit} secondary>
                      <FiX /> Cancel
                    </EditButton>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <UserInfoHeader>
                    <h3>{profile.name}</h3>
                    <EditButton onClick={handleEditClick}>
                      <FiEdit2 /> Edit Profile
                    </EditButton>
                  </UserInfoHeader>
                  <p>{profile.email}</p>
                  {profile.venueManager && <span className="badge">Venue Manager</span>}
                  {profile.bio && <Bio>{profile.bio}</Bio>}
                </>
              )}
            </UserInfo>
          </ProfileSection>
        )}

        {activeTab === 'bookings' && (
          <BookingsSection>
            <SectionTitle>My Bookings</SectionTitle>
            <BookingsList />
          </BookingsSection>
        )}

        {activeTab === 'venues' && profile.venueManager && (
          <VenuesSection>
            <SectionTitle>My Venues</SectionTitle>
            <VenueManagement />
          </VenuesSection>
        )}
      </AccountContent>
    </AccountContainer>
  );
}

export default Account;