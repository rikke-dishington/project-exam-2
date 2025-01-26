import LoginForm from '../../components/auth/LoginForm/LoginForm';
import {
  PageContainer,
  ContentWrapper,
  Title,
} from './login.styles';

function Login() {
  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Welcome Back</Title>
        <LoginForm />
      </ContentWrapper>
    </PageContainer>
  );
}

export default Login;