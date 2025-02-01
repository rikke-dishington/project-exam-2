import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilesApi } from '../features/profile/api/profiles';
import { initializeApiKey } from '../api/config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    // Check localStorage on initial load
    const savedUser = localStorage.getItem('user');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    return parsedUser ? {
      ...parsedUser,
      venueManager: parsedUser.venueManager || false
    } : null;
  });
  const navigate = useNavigate();

  const updateUser = useCallback(async (userData) => {
    if (userData) {
      try {
        // Fetch complete profile data after login
        const response = await profilesApi.getProfile(userData.name);
        const profileData = response.data || response;
        
        // Combine login data with profile data
        const completeUserData = {
          ...userData,
          ...profileData,
          venueManager: profileData.venueManager || false
        };
        
        // Store in state and localStorage
        setUser(completeUserData);
        localStorage.setItem('user', JSON.stringify(completeUserData));
      } catch (error) {
        console.error('Failed to fetch complete profile:', error);
        // Still update with basic user data if profile fetch fails
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    }
  }, []);

  const clearUser = useCallback(() => {
    // Clear both state and localStorage
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const logout = useCallback(() => {
    clearUser();
    navigate('/login');
  }, [navigate, clearUser]);

  const updateProfile = async (data) => {
    try {
      const updatedProfile = await profilesApi.updateProfile(user.name, data);
      
      setUser(prev => ({
        ...prev,
        ...updatedProfile,
        avatar: updatedProfile.avatar,
        banner: updatedProfile.banner,
        bio: updatedProfile.bio,
        venueManager: updatedProfile.venueManager
      }));

      // Store updated user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...updatedProfile,
        avatar: updatedProfile.avatar,
        banner: updatedProfile.banner,
        bio: updatedProfile.bio,
        venueManager: updatedProfile.venueManager
      }));

      return updatedProfile;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await initializeApiKey();
        if (mounted) {
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Failed to initialize API key:', err);
        if (mounted) {
          setError('Failed to initialize application');
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Or your error component
  }

  const isLoggedIn = !!user;
  const isVenueManager = user?.venueManager || false;

  const value = {
    user,
    updateUser,
    clearUser,
    logout,
    isLoggedIn,
    isVenueManager,
    updateProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Optional: Protected Route Component
export function RequireAuth({ children, requireManager = false }) {
  const { isLoggedIn, isVenueManager } = useUser();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  if (requireManager && !isVenueManager) {
    navigate('/'); // or to an unauthorized page
    return null;
  }

  return children;
} 