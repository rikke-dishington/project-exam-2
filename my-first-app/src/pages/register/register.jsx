import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import {
  PageContainer,
  ContentWrapper,
  Title,
} from './register.styles';

function Register() {
  return (
    <PageContainer>
      <ContentWrapper>
        <Title>Create an Account</Title>
        <RegisterForm />
      </ContentWrapper>
    </PageContainer>
  );
}

export default Register;