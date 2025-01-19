import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { authEndpoints } from '../../utils/api';
import {
  PageContainer,
  FormContainer,
  Title,
  Form,
  Input,
  SubmitButton,
  ErrorMessage,
  LinkText
} from './login.styles';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await authEndpoints.login(formData);
      console.log('Login response:', data); // Debug log
      
      // Store the complete user data including the name
      const userData = {
        ...data,
        name: data.name, // Ensure we have the username
        accessToken: data.accessToken
      };
      
      updateUser(userData);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Welcome Back</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email (@stud.noroff.no)"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <SubmitButton 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </Form>
        
        <LinkText>
          Don't have an account? <a href="/register">Register here</a>
        </LinkText>
      </FormContainer>
    </PageContainer>
  );
}

export default Login;