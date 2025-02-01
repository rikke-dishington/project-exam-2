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