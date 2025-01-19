import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS, getHeaders } from '../utils/api/config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      
      localStorage.setItem('token', data.accessToken);
      setUser(data);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
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
      
      setUser(prev => ({ ...prev, avatar: avatarUrl }));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    updateAvatar,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserContext }; 