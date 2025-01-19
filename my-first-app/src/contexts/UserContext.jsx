import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS, getHeaders } from '../utils/api/config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check for existing user session on initial load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = (userData) => {
    if (userData) {
      // Store both token and user data
      localStorage.setItem('token', userData.accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      // Clear both token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const logout = () => {
    updateUser(null);
    navigate('/login');
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(API_URLS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      updateUser(data);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const updateAvatar = async (avatarUrl) => {
    try {
      if (!user) return;
      
      const response = await fetch(`${API_URLS.profiles}/${user.name}/media`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ avatar: avatarUrl }),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      updateUser(prev => ({ ...prev, avatar: avatarUrl }));
      return data;
    } catch (error) {
      throw error;
    }
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  const value = {
    user,
    updateUser,
    logout,
    login,
    updateAvatar,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserContext }; 