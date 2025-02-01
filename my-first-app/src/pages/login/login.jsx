import LoginForm from '../../components/auth/LoginForm/LoginForm';
import {
  PageContainer,
  ContentWrapper,
  Title,
} from './login.styles';
import { useUser } from '../../context/UserContext';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../utils/api/auth';

function Login() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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