import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export function UserProvider({ children }) {
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

  const isLoggedIn = !!user;
  const isVenueManager = user?.venueManager || false;

  const value = {
    user,
    updateUser,
    clearUser,
    logout,
    isLoggedIn,
    isVenueManager,
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