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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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