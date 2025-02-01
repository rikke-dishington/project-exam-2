import RegisterForm from '../../components/RegisterForm';
import {
  PageContainer,
  ContentWrapper,
  Title,
} from './styles';

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