import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS, getHeaders } from '../utils/api/config';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateUser = (newUser) => {
    try {
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('user');
      }
      setUser(newUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
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

  if (isLoading) {
    return null; // or a loading spinner
  }

  const value = {
    user,
    updateUser,
    logout,
    login,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext }; 