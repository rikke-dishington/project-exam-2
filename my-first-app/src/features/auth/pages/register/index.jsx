import RegisterForm from '../../components/RegisterForm';
import {
  PageContainer,
  ContentWrapper,
  Title,
} from './styles';

/**
 * Register Page Component
 * 
 * The main registration page that provides user account creation functionality.
 * Presents a clean, centered layout with a registration form for new users.
 * 
 * Features:
 * - Clean, centered layout design
 * - Clear page title
 * - Registration form integration
 * - Responsive design
 * 
 * Layout Structure:
 * - Container with centered content
 * - Page title "Create an Account"
 * - Registration form with:
 *   - Username input
 *   - Email input (@stud.noroff.no)
 *   - Password input
 *   - Venue manager toggle
 *   - Submit button
 *   - Login link for existing users
 * 
 * @component
 * @example
 * ```jsx
 * <Routes>
 *   <Route path="/register" element={<Register />} />
 * </Routes>
 * ```
 * 
 * @see {@link RegisterForm} For the form component that handles the registration logic
 */
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