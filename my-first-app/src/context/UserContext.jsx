import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profilesApi } from '../features/profile/api/profiles';
import { initializeApiKey } from '../api/config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    return parsedUser ? {
      ...parsedUser,
      venueManager: parsedUser.venueManager || false
    } : null;
  });
  const navigate = useNavigate();

  const fetchUserProfile = async (username) => {
    try {
      const response = await profilesApi.getProfile(username);
      const profileData = response.data || response;
      return profileData;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return null;
    }
  };

  const updateUser = useCallback(async (userData) => {
    if (userData) {
      try {
        // First store the token and basic user data
        const basicUserData = {
          ...userData,
          venueManager: false // Default value until we get the complete profile
        };
        localStorage.setItem('token', userData.accessToken);
        setUser(basicUserData);
        localStorage.setItem('user', JSON.stringify(basicUserData));

        // Initialize API key with the token
        const apiKey = await initializeApiKey();
        if (!apiKey) {
          console.warn('Could not initialize API key, will retry later');
        }

        // Try to fetch the profile even if API key initialization failed
        try {
          const profileData = await fetchUserProfile(userData.name);
          if (profileData) {
            const completeUserData = {
              ...userData,
              ...profileData,
              venueManager: profileData.venueManager || false
            };
            
            setUser(completeUserData);
            localStorage.setItem('user', JSON.stringify(completeUserData));
          }
        } catch (profileError) {
          console.error('Failed to fetch profile:', profileError);
        }
      } catch (error) {
        console.error('Failed to complete user setup:', error);
        // Keep the basic user data if setup fails
        const basicUserData = {
          ...userData,
          venueManager: false
        };
        setUser(basicUserData);
        localStorage.setItem('user', JSON.stringify(basicUserData));
      }
    }
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('noroff_api_key');
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

  // Initialize API key on mount and when user changes
  useEffect(() => {
    let mounted = true;
    let retryTimeout;

    const init = async () => {
      try {
        if (user) {
          // First ensure we have an API key
          const apiKey = await initializeApiKey();
          
          if (!apiKey && mounted) {
            // If API key initialization failed, schedule a retry
            retryTimeout = setTimeout(init, 5000);
            return;
          }

          // Then fetch the profile
          if (mounted) {
            try {
              const profileData = await fetchUserProfile(user.name);
              if (profileData && mounted) {
                const updatedUser = {
                  ...user,
                  ...profileData,
                  venueManager: profileData.venueManager || false
                };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
              }
            } catch (profileError) {
              console.error('Failed to fetch profile:', profileError);
            }
          }
        }
        if (mounted) {
          setIsInitialized(true);
        }
      } catch (err) {
        console.error('Failed to initialize:', err);
        if (mounted) {
          setError('Failed to initialize application');
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
    };
  }, [user?.name]); // Only re-run if username changes

  if (!isInitialized && user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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