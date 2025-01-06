import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../utils/api/auth';
import {
  RegisterContainer,
  RegisterForm,
  Title,
  InputGroup,
  SubmitButton,
  ErrorMessage,
  LoginPrompt,
  ValidationError
} from './register.styles';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
    avatar: {
      url: '',
      alt: ''
    },
    banner: {
      url: '',
      alt: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!/^[a-zA-Z0-9_]+$/.test(formData.name)) {
      newErrors.name = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email.endsWith('@stud.noroff.no')) {
      newErrors.email = 'Please use a valid Noroff student email (@stud.noroff.no)';
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      setErrors({ submit: error.message || 'Oh noo... something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Title>Create Account</Title>
      {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
      <RegisterForm onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="name">
            Username <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Only letters, numbers, and underscores"
          />
          {errors.name && <ValidationError>{errors.name}</ValidationError>}
        </InputGroup>

        <InputGroup>
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="example@stud.noroff.no"
          />
          {errors.email && <ValidationError>{errors.email}</ValidationError>}
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Minimum 8 characters"
          />
          {errors.password && <ValidationError>{errors.password}</ValidationError>}
        </InputGroup>

        <InputGroup>
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
      </RegisterForm>
      <LoginPrompt>
        Already have an account? <Link to="/login">Login here</Link>
      </LoginPrompt>
    </RegisterContainer>
  );
}

export default Register;