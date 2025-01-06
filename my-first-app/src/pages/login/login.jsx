import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../utils/api';
import {
  LoginContainer,
  LoginForm,
  Title,
  InputGroup,
  SubmitButton,
  ErrorMessage,
  RegisterPrompt
} from './login.styles';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userData = await login(formData.email, formData.password);
      console.log('Login successful:', userData);
      navigate('/');
    } catch (error) {
      setError('Oh noo... the email or password is invalid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginForm onSubmit={handleSubmit}>
        <InputGroup>
          <label htmlFor="email">Email</label>
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
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </InputGroup>
        
        <SubmitButton 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </SubmitButton>
      </LoginForm>
      <RegisterPrompt>
        Don't have an account yet? <Link to="/register">Register here</Link>
      </RegisterPrompt>
    </LoginContainer>
  );
}

export default Login;