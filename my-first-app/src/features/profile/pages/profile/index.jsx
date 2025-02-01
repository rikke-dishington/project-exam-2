import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';
import { FaEdit } from 'react-icons/fa';
import { profilesApi } from '../../api/profiles';
import {
  ProfileBanner,
  ProfileInfo,
  ProfileEditModal
} from '../../components';
import {
  Container,
  ProfileHeader,
  EditButton,
} from './styles';

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

  const fetchProfile = useCallback(async () => {
    try {
      const response = await profilesApi.getProfile(name);
      const profileData = response.data || response;
      
      setFormData({
        avatar: profileData.avatar?.url || '',
        banner: profileData.banner?.url || '',
        bio: profileData.bio || '',
        venueManager: profileData.venueManager || false
      });

      setUser(prev => ({
        ...prev,
        ...profileData,
        venueManager: profileData.venueManager || false
      }));
    } catch (err) {
      setError(err.message || 'Failed to load profile data');
    }
  }, [name, setUser]);

  useEffect(() => {
    if (name && (name !== user?.name || !user?.venueManager === undefined)) {
      fetchProfile();
    }
  }, [name, user?.name, fetchProfile]);

  useEffect(() => {
    setFormData({
      banner: user?.banner?.url || '',
      avatar: user?.avatar?.url || '',
      bio: user?.bio || '',
      venueManager: user?.venueManager || false
    });
  }, [user]);

  const isValidUrl = useCallback((string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }, []);

  const validateForm = useCallback((data) => {
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
  }, [isValidUrl]);

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

  return (
    <Container>
      <ProfileHeader>
        <h1>Profile</h1>
        <EditButton onClick={() => setIsModalOpen(true)}>
          <FaEdit />
          Edit Profile
        </EditButton>
      </ProfileHeader>

      <ProfileBanner 
        banner={user.banner}
        avatar={user.avatar}
        name={user.name}
      />
      
      <ProfileInfo user={user} />

      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default Profile; 