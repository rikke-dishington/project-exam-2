import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS, getHeaders } from '../utils/api/config';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: false,
  error: null
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const response = await fetch(`${API_URLS.profiles}/${userData.name}`, {
            headers: getHeaders()
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          
          const profile = await response.json();
          setUser({ ...userData, ...profile });
        }
      } catch (err) {
        console.error('Error initializing user:', err);
        setError(err.message);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

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

  const value = {
    user,
    updateUser,
    logout,
    login,
    isAuthenticated: !!user,
    isLoading,
    error
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserContext }; 