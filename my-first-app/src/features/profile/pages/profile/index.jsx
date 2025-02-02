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

/**
 * Profile Page Component
 * 
 * A comprehensive profile page that displays and manages user profile information.
 * Supports viewing and editing profile details including avatar, banner, bio,
 * and venue manager status.
 * 
 * Features:
 * - Profile information display
 * - Profile editing capabilities
 * - Banner and avatar management
 * - Bio text management
 * - Venue manager toggle
 * - Form validation
 * - Error handling
 * - Loading states
 * - URL validation
 * 
 * State Management:
 * - Manages profile data fetching
 * - Handles form state
 * - Controls modal visibility
 * - Manages loading and error states
 * - Syncs with user context
 * 
 * Data Flow:
 * - Fetches profile data on mount/name change
 * - Updates local form state
 * - Validates form submissions
 * - Updates global user context
 * - Handles API interactions
 * 
 * @component
 * @example
 * ```jsx
 * <Routes>
 *   <Route path="/profile/:name" element={<Profile />} />
 * </Routes>
 * ```
 */
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

  /**
   * Fetches profile data from the API and updates local and global state
   * Handles error states for failed fetches
   */
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

  // Fetch profile data when name changes or user data is incomplete
  useEffect(() => {
    if (name && (name !== user?.name || !user?.venueManager === undefined)) {
      fetchProfile();
    }
  }, [name, user?.name, fetchProfile]);

  // Update form data when user data changes
  useEffect(() => {
    setFormData({
      banner: user?.banner?.url || '',
      avatar: user?.avatar?.url || '',
      bio: user?.bio || '',
      venueManager: user?.venueManager || false
    });
  }, [user]);

  /**
   * Validates if a string is a valid URL
   * @param {string} string - String to validate as URL
   * @returns {boolean} Whether the string is a valid URL
   */
  const isValidUrl = useCallback((string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }, []);

  /**
   * Validates form data before submission
   * @param {Object} data - Form data to validate
   * @returns {Array<string>} Array of validation error messages
   */
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

  /**
   * Handles form field changes
   * @param {Event} e - Change event from form field
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Handles form submission
   * Validates form data and updates profile
   * @param {Event} e - Form submit event
   */
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
        <EditButton 
          onClick={() => setIsModalOpen(true)}
          aria-label="Edit profile"
        >
          <FaEdit aria-hidden="true" />
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