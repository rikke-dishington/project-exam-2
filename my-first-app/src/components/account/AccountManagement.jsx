import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getProfile, updateProfile } from '../../utils/api/profiles';
import AccountForm from './AccountForm';
import AccountCard from './AccountCard';
import {
  ProfileSection,
  ProfileHeader,
  LoadingSpinner,
  EmptyState,
  ErrorMessage,
  SuccessMessage
} from './AccountManagement.styles';

function AccountManagement() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (updatedData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updatedProfile = await updateProfile(user.name, updatedData);
      setProfile(updatedProfile);
      setSuccess('Profile updated successfully!');
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setSelectedProfile(profile);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedProfile(null);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess('');
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(user.name);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) return <div>Please log in to manage your profile</div>;
  
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

      <ProfileSection>
        {isLoading ? (
          <LoadingSpinner />
        ) : !profile ? (
          <EmptyState>
            <p>No profile data available.</p>
            <p>Please update your profile information.</p>
          </EmptyState>
        ) : (
          <>
            <ProfileHeader>
              <h2>Profile</h2>
            </ProfileHeader>

            <AccountCard 
              profile={profile} 
              onEdit={handleEdit}
            />
          </>
        )}

        {showForm && (
          <AccountForm 
            profile={selectedProfile}
            onSubmit={handleSubmit}
            onClose={handleClose}
          />
        )}
      </ProfileSection>
    </div>
  );
}

export default AccountManagement; 