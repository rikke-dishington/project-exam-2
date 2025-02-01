import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FaUser, FaEdit, FaCamera } from 'react-icons/fa';
import { profilesApi } from '../../utils/api/profiles';
import {
  Container,
  ProfileHeader,
  ProfileInfo,
  EditButton,
  ProfileModal,
  ModalContent,
  InputGroup,
  Label,
  Input,
  Checkbox,
  SaveButton,
  ImagePreview,
  ErrorMessage,
  BannerSection,
  BannerImage,
  AvatarOverlay,
  ProfileAvatar,
  ProfileContent
} from './profile.styles';

function Profile() {
  const { name } = useParams();
  const { user, updateProfile, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(() => ({
    banner: user?.banner?.url || '',
    avatar: user?.avatar?.url || '',
    bio: user?.bio || '',
    venueManager: user?.venueManager || false
  }));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profilesApi.getProfile(name);
        const profileData = response.data || response;
        
        // Update form data
        setFormData({
          avatar: profileData.avatar?.url || '',
          banner: profileData.banner?.url || '',
          bio: profileData.bio || '',
          venueManager: profileData.venueManager || false
        });

        // Update user context
        setUser(prev => ({
          ...prev,
          ...profileData,
          venueManager: profileData.venueManager || false
        }));
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data');
      }
    };

    // Only fetch if viewing a different profile or if user data is incomplete
    if (name && (name !== user?.name || !user?.venueManager === undefined)) {
      fetchProfile();
    }
  }, [name, user?.name]);

  // Reset form data when user changes
  useEffect(() => {
    setFormData({
      banner: user?.banner?.url || '',
      avatar: user?.avatar?.url || '',
      bio: user?.bio || '',
      venueManager: user?.venueManager || false
    });
    console.log('Current user data:', user);
    console.log('venueManager status:', user?.venueManager);
  }, [user]);

  // Add form validation
  const validateForm = (data) => {
    const errors = [];
    
    if (data.avatar && !isValidUrl(data.avatar)) {
      errors.push('Avatar URL is not valid');
    }
    if (data.banner && !isValidUrl(data.banner)) {
      errors.push('Banner URL is not valid');
    }
    if (data.bio && data.bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setIsLoading(false);
      return;
    }

    try {
      await updateProfile(formData);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Container>
      <ProfileHeader>
        <h1>Profile</h1>
        <EditButton onClick={() => setIsModalOpen(true)}>
          <FaEdit />
          Edit Profile
        </EditButton>
      </ProfileHeader>

      <BannerSection>
        <BannerImage>
          {user.banner?.url ? (
            <img src={user.banner.url} alt="Profile banner" />
          ) : (
            <div className="placeholder-banner" />
          )}
        </BannerImage>
        <AvatarOverlay>
          <ProfileAvatar>
            {user.avatar?.url ? (
              <img src={user.avatar.url} alt={user.name} />
            ) : (
              <FaUser />
            )}
          </ProfileAvatar>
        </AvatarOverlay>
      </BannerSection>
      
      <ProfileInfo>
        <ProfileContent>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
          {user.venueManager && <p className="badge">Venue Manager</p>}
        </ProfileContent>
      </ProfileInfo>

      {isModalOpen && (
        <ProfileModal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Label>Banner URL</Label>
                <Input
                  type="url"
                  name="banner"
                  value={formData.banner}
                  onChange={handleChange}
                  placeholder="Enter banner image URL"
                />
                {formData.banner && (
                  <ImagePreview>
                    <img src={formData.banner} alt="Banner preview" />
                  </ImagePreview>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Avatar URL</Label>
                <Input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="Enter avatar image URL"
                />
                {formData.avatar && (
                  <ImagePreview $isAvatar>
                    <img src={formData.avatar} alt="Avatar preview" />
                  </ImagePreview>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Bio</Label>
                <Input
                  as="textarea"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </InputGroup>

              <InputGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    name="venueManager"
                    checked={formData.venueManager}
                    onChange={handleChange}
                  />
                  <span>I want to be a venue manager</span>
                </Checkbox>
              </InputGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SaveButton type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </SaveButton>
            </form>
          </ModalContent>
        </ProfileModal>
      )}
    </Container>
  );
}

export default Profile; 