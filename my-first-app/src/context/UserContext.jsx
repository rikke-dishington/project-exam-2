import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilesApi } from '../utils/api/profiles';
import { initializeApiKey } from '../utils/api/config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    // Check localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const updateUser = useCallback((userData) => {
    if (userData) {
      // Store in state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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

  const updateProfile = async (profileData) => {
    try {
      const userName = user?.name || localStorage.getItem('userName');
      if (!userName) {
        throw new Error('User name not found');
      }

      console.log('Updating profile for:', userName); // Debug log
      console.log('Profile data:', profileData); // Debug log

      const updatedUser = await profilesApi.updateProfile(userName, profileData);
      
      // Update local storage and state with new user data
      const newUserData = { ...user, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
      
      return updatedUser;
    } catch (error) {
      console.error('Failed to update profile:', error);
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