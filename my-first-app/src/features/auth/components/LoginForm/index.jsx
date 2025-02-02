import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useUser } from '../../../../context/UserContext';
import {
  Form,
  FormGroup,
  Input,
  Label,
  ErrorMessage,
  SubmitButton,
  RegisterLink,
  FieldError,
} from './styles';

/**
 * LoginForm Component
 * 
 * A form component that handles user authentication through email and password.
 * Includes field validation, error handling, and loading states.
 * 
 * Features:
 * - Email validation for @stud.noroff.no domain
 * - Password validation
 * - Real-time field validation
 * - Loading state during authentication
 * - Error messages for invalid inputs and failed login attempts
 * - Navigation to home page on successful login
 * - Link to registration page for new users
 * 
 * @component
 * @example
 * ```jsx
 * <LoginForm />
 * ```
 */
function LoginForm() {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validates individual form fields based on specific rules
   * 
   * @param {string} name - The name of the field to validate
   * @param {string} value - The value to validate
   * @returns {string} Empty string if valid, error message if invalid
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!/^[\w\-.]+@stud\.noroff\.no$/.test(value)) {
          return 'Must be a valid @stud.noroff.no email';
        }
        return '';

      case 'password':
        if (!value) {
          return 'Password is required';
        }
        return '';

      default:
        return '';
    }
  };

  /**
   * Handles changes in form input fields
   * Updates the form state with the new values
   * 
   * @param {Object} e - The change event object
   * @param {string} e.target.name - The name of the changed field
   * @param {string} e.target.value - The new value of the field
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles form submission
   * Validates all fields, attempts login, and handles the response
   * 
   * @param {Object} e - The submit event object
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    // Validate all fields before submission
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const userData = await authApi.login(formData);
      
      // Store user data in context
      updateUser({
        ...userData,
        name: userData.name,
        email: userData.email,
        accessToken: userData.accessToken,
        venueManager: userData.venueManager
      });

      // Navigate to home page after successful login
      navigate('/', { 
        replace: true // This prevents going back to login page
      });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />
        {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </SubmitButton>

      <RegisterLink to="/register">
        Don't have an account? Register here
      </RegisterLink>
    </Form>
  );
}

export default LoginForm; 