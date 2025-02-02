import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';
import { authApi } from '../../api/auth';
import LoginForm from '../../components/LoginForm';
import {
  PageContainer,
  ContentWrapper,
  Title,
} from './styles';

/**
 * Login Page Component
 * 
 * The main login page of the application that handles user authentication.
 * Provides a centralized interface for user login with error handling and loading states.
 * 
 * Features:
 * - Centralized login form presentation
 * - Integration with user context for authentication state
 * - Error handling and display
 * - Loading state management
 * - Automatic navigation after successful login
 * - Clean and responsive layout
 * 
 * Dependencies:
 * - Uses UserContext for authentication state management
 * - Integrates with authApi for login requests
 * - Uses react-router for navigation
 * 
 * @component
 * @example
 * ```jsx
 * // In your router configuration
 * <Route path="/login" element={<Login />} />
 * ```
 */
function Login() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the login form submission
   * Attempts to authenticate the user and updates the global user context on success
   * 
   * @param {Object} formData - The form data from the login form
   * @param {string} formData.email - User's email address
   * @param {string} formData.password - User's password
   * @param {Object} e - The form submission event
   * @returns {Promise<void>}
   * 
   * Flow:
   * 1. Prevents default form submission
   * 2. Sets loading state
   * 3. Attempts authentication via API
   * 4. Updates user context on success
   * 5. Navigates to venues page
   * 6. Handles any errors that occur
   */
  const handleSubmit = async (formData, e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(formData);
      await updateUser(response.data);
      navigate('/venues');
    } catch (err) {
      setError(err.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Welcome Back</Title>
        <LoginForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
      </ContentWrapper>
    </PageContainer>
  );
}

export default Login;