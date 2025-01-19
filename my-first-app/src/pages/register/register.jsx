import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { useUser } from '../../contexts/UserContext';
import { authEndpoints } from '../../utils/api';
import {
  PageContainer,
  FormContainer,
  Title,
  Form,
  Input,
  InputGroup,
  SubmitButton,
  ErrorMessage,
  ValidationMessage,
  LinkText
} from './register.styles';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (formData.name.length < 3) {
      errors.name = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.name)) {
      errors.name = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email.endsWith('@stud.noroff.no')) {
      errors.email = 'Must use a @stud.noroff.no email address';
    }

    // Password validation
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await authEndpoints.register(formData);
      console.log('Registration successful:', data);
      
      // Log in the user automatically after registration
      const loginData = await authEndpoints.login({
        email: formData.email,
        password: formData.password
      });
      
      updateUser(loginData);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateForm(); // Validate on every change
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Create Account</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
              error={validationErrors.name}
            />
            {validationErrors.name && (
              <ValidationMessage>
                <FiAlertCircle /> {validationErrors.name}
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              error={validationErrors.email}
            />
            {validationErrors.email && (
              <ValidationMessage>
                <FiAlertCircle /> {validationErrors.email}
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              error={validationErrors.password}
            />
            {validationErrors.password && (
              <ValidationMessage>
                <FiAlertCircle /> {validationErrors.password}
              </ValidationMessage>
            )}
          </InputGroup>

          <InputGroup className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="venueManager"
                checked={formData.venueManager}
                onChange={handleChange}
              />
              Register as Venue Manager
            </label>
          </InputGroup>

          <SubmitButton 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SubmitButton>
        </Form>
        
        <LinkText>
          Already have an account? <a href="/login">Login here</a>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
}

export default Register;