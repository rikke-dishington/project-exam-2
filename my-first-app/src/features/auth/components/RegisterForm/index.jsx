import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import {
  Form,
  FormGroup,
  Input,
  Label,
  ErrorMessage,
  SubmitButton,
  LoginLink,
  FieldError,
} from './styles';

/**
 * RegisterForm Component
 * 
 * A form component that handles new user registration with comprehensive validation.
 * Allows users to create an account with username, email, password, and venue manager status.
 * 
 * Features:
 * - Username validation (min length, allowed characters)
 * - Email validation for @stud.noroff.no domain
 * - Password validation (min length)
 * - Option to register as a venue manager
 * - Real-time field validation
 * - Loading state during registration
 * - Error messages for invalid inputs
 * - Navigation to login page on successful registration
 * - Link to login page for existing users
 * 
 * @component
 * @example
 * ```jsx
 * <RegisterForm />
 * ```
 */
function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
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
   * 
   * Validation Rules:
   * - name: min 3 chars, alphanumeric + underscore only
   * - email: must be @stud.noroff.no domain
   * - password: min 8 chars
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (value.length < 3) {
          return 'Username must be at least 3 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers and underscore';
        }
        return '';

      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!/^[\w\-.]+@stud\.noroff\.no$/.test(value)) {
          return 'Must be a valid @stud.noroff.no email';
        }
        return '';

      case 'password':
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        return '';

      default:
        return '';
    }
  };

  /**
   * Handles changes in form input fields
   * Updates the form state with the new values
   * Handles both text inputs and checkbox
   * 
   * @param {Object} e - The change event object
   * @param {string} e.target.name - The name of the changed field
   * @param {string|boolean} e.target.value - The new value of the field
   * @param {string} e.target.type - The type of input ('text', 'checkbox', etc.)
   * @param {boolean} e.target.checked - The checked state for checkboxes
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Handles form submission
   * Validates all fields, attempts registration, and handles the response
   * On success, redirects to login page with success message
   * On failure, displays error message
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
      if (key !== 'venueManager') {
        const error = validateField(key, formData[key]);
        if (error) {
          errors[key] = error;
        }
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register(formData);
      navigate('/login', { 
        state: { message: 'Registration successful! Please log in.' }
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Username</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors.name}
        />
        {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
      </FormGroup>

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

      <FormGroup>
        <Label checkbox>
          <Input
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={handleChange}
          />
          Register as Venue Manager
        </Label>
      </FormGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </SubmitButton>

      <LoginLink to="/login">
        Already have an account? Log in
      </LoginLink>
    </Form>
  );
}

export default RegisterForm; 